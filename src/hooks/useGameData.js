import React, { useEffect, useState } from 'react';

export const useGameData = (web3, factoryContract, gameAbi) => {

  const [state, setState] = useState({
    isLoading: true,
  });
  useEffect(() => {    
    // CLEANUP  
    let isSubscribed = true; 
    const getAddress = async() => {
      const address = await web3.eth.getAccounts();
      setState(state => ({
        ...state,
        myAddress: address[0]
      }))
      console.log(address)
    }
    const getGameData = async(gameContract, contractAddress) => {
      // CONSTANTS
      const predictionCost = await gameContract.methods.cost_to_predict().call()
      const assetName = await gameContract.methods.asset().call()
      const resolutionPeriod = await gameContract.methods.resolution_period().call()
      const competitionPeriod = await gameContract.methods.competition_duration().call()
      const pricePredictionPeriod = await gameContract.methods.price_prediction_period().call()
      // COUNTDOWNS
      let resolutionPeriodCountdown = null;
      let gameEndsCountdown = null;
      let predictionPeriodCountdown = null;
      handleCountdown(contractAddress, resolutionPeriodCountdown, resolutionPeriod, 'resolutionPeriodCountdown', 'resolution has ended');
      handleCountdown(contractAddress, gameEndsCountdown, competitionPeriod, 'gameEndsCountdown', 'Game has ended');
      handleCountdown(contractAddress, predictionPeriodCountdown, pricePredictionPeriod, 'predictionPeriodCountdown', 'price prediction period is over');
      setState(state => ({
        ...state,
        games: {
          ...state.games,
          [contractAddress]: {
            gameContract: gameContract,
            predictionCost: predictionCost,
            assetName: assetName,
            assetPrice: 'none',
            resolutionPeriod: resolutionPeriod,
            competitionPeriod: competitionPeriod,
            pricePredictionPeriod: pricePredictionPeriod,
            countedPredictions: null,
            winningPrediction: 'unclaimed',
            myPositions: {
              num: 0,
              predictions: []
            },
            positions: [],
            totalPredictionPool: 0,
            predictionPeriodCountdown: {
              timeLeft: null,
              durationDated: null,
              isOverMessage: '',
              isOver: false
            },
            gameEndsCountdown: {
              timeLeft: null,
              durationDated: null,
              isOverMessage: '',
              isOver: false
            },
            resolutionPeriodCountdown: {
              timeLeft: null,
              durationDated: null,
              isOverMessage: '',
              isOver: false
            }
          }
        }
      }))
    }

    const subscribeToGame = (gameContract, gameAddress) => {
      // subscribe turn into hooks? 
      gameContract.events.assetPriceSet({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,
            games: {
              ...state.games,
              [gameAddress]: {
                ...state.games[gameAddress],
                assetPrice: event.returnValues.price
              }
            }            
          }))
        }  
      })
      gameContract.events.winningPredictionSet({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          console.log(event.returnValues.prediction)
          setState(state => ({
            ...state,
            games: {
              ...state.games,
              [gameAddress]: {
                ...state.games[gameAddress],
                winningPrediction: event.returnValues.prediction
              }
            }
          }))                                         
        }  
      })
      gameContract.events.numberOfWinners({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,
            games: {
              ...state.games,
              [gameAddress]: {
                ...state.games[gameAddress],
                numOfWinners: event.returnValues.winners       
              }
            }                             
          }))              
        }  
      })
      gameContract.events.feeCollected({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,
            games: {
              ...state.games,
              [gameAddress]: {
                ...state.games[gameAddress],       
                feeCollected: event.returnValues.collected                          
              }
            }
          }))                    
        }  
      })
      gameContract.events.totalPredictionPool({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          setState(state => ({
            ...state,
            games: {
              ...state.games,
              [gameAddress]: {
                ...state.games[gameAddress], 
                totalPredictionPool: event.returnValues.total         
              }
            }                 
          }))                        
        }  
      })
      gameContract.events.positionAdded({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) {
          let player = event.returnValues.player
          let predictionPrice = event.returnValues.predictionPrice
          // see if the predicted price is already predicted

 
          // add player to players
          setState(state => ({
            ...state,
            numOfPositions: state.numOfPositions + 1,
            games: {
              ...state.games,
              [gameAddress]: {
                ...state.games[gameAddress],
                positions: [
                  ...state.games[gameAddress].positions,
                  {
                    player: player, 
                    predictionPrice: predictionPrice
                  }
                ]     
              }
            }                     
          }))                   

        } 
      })                                                        
    }  
    const loadData = async () => {
      await factoryContract.events.contractCreated({
        fromBlock: 0,
        toBlock: 'latest',
      }, (error, event) => {
        if (!error) { 
          // init game contract
          let gameAddress = event.returnValues.newAddress;
          let gameContract = new web3.eth.Contract(gameAbi, gameAddress)
          // Get constant data then subscribe to events        
          getGameData(gameContract, gameAddress)
            .then(() => {
              subscribeToGame(gameContract, gameAddress);
            })
            
        } else {
          console.log(error)
        }
      })        
    }
    if (isSubscribed === true) {
      // for each contract get gameData
      getAddress()
        .then(() => {
          loadData();
        })

      setState(state => ({
        ...state,
        isLoading: false,
      }));   
      console.log(state) 
    } 
    return () => isSubscribed = false;
  }, [])  


  const handleCountdown = (address, countdown, duration, countdownName, isOverMessage) => {
    countdown = setInterval(() => {  
      // Get today's date and time
      let now = new Date().getTime();
      let durationDated = new Date(duration * 1000)
      // Find the distance between now and the count down date
      let distance = durationDated - now;
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // format time
      let timeLeft;
      if (days === 0) {
        if (hours === 0) {
          if (minutes == 0) {
            timeLeft = seconds + "s " 
          } else {
            timeLeft = minutes + "m " + seconds + "s "; 
          }
        } else {
          timeLeft = hours + "h " + minutes + "m " + seconds + "s "; 
        }    
      } else {
        timeLeft = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; 
      }

    
      
       
      setState(state => ({
        ...state,
        games: {
          ...state.games,
          [address]: {
            ...state.games[address],
            [countdownName]: {
              timeLeft: timeLeft,
              durationDated: durationDated,
              isOverMessage: isOverMessage,
              isOver: false,
            }
          }
        }
      }))
      // If the count down is finished
      if (distance < 0) {
        clearInterval(countdown);
        setState(state => ({
          ...state,
          games: {
            ...state.games,
            [address]: {
              ...state.games[address],
              [countdownName]: {
                timeLeft: timeLeft,
                durationDated: durationDated,
                isOverMessage: isOverMessage,
                isOver: true,
              }
            }
          }
        }))        
      }
    }, 1000);      
  }
  return state;
}
