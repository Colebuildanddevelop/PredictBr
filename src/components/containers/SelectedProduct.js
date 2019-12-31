import React, {useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { withWeb3 } from 'react-web3-provider';
import Gamelist from '../Gamelist';
import Game from '../Game';
import Graph from '../Graph';
// MATERIAL UI 


const SelectedProduct = (props) => {
  // REACT ROUTER
  let { path } = useRouteMatch();  
  // get the game list for the associated product    
  const { web3 } = props;  
  const [state, setState] = useState({
    isLoading: true,
  })
  const factoryContract = new web3.eth.Contract(props.factoryAbi, props.factoryAddress);  

  useEffect(() => {
    const getGraphData = async() => {
      const response = await fetch(props.graphUrl);
      const myJson = await response.json();
      let updatedArr = [] 
      let maxTenDays = 0;
      Object.entries(myJson[props.timeSeriesKey]).forEach((entry) => {
        if (maxTenDays <= 10) {
          updatedArr.push({
            x: new Date(entry[0]),  
            open: entry[1][props.OHLCKeys.open], 
            high: entry[1][props.OHLCKeys.high],
            low: entry[1][props.OHLCKeys.low],
            close: entry[1][props.OHLCKeys.close],  
          });
          maxTenDays += 1;
        }
      })
      setState(state => ({
        ...state,
        productData: updatedArr,
      }))
      console.log(updatedArr)
    }
    getGraphData();
  }, [])

  useEffect(() => {
    const handlePositions = () => {
      if (state.games !== undefined) {
        // key is gameAddress, value is gameState
        for (let [key, value] of Object.entries(state.games)) {
          console.log(value.positions)
          console.log(state.myAddress)
          let counter = 0;
          let playerPredictions = [];
          // predictions.price.count
          let predictions = {};
          // for each position
          value.positions.forEach(position => {       
            // get players positions     
            if (position.player === state.myAddress) {
              counter += 1;
              playerPredictions.push(position.predictionPrice)
              console.log(counter)              
            }
            // if prediction has been counted add to the count 
            let predictionKeys = Object.keys(predictions)
            if (predictionKeys.includes(position.predictionPrice) === true) {
              predictions[position.predictionPrice] += 1;
            } else {
              predictions[position.predictionPrice] = 1;
            }                        
          })
          setState(state => ({
            ...state,
            games: {
              ...state.games,
              [key]: {
                ...state.games[key],
                countedPredictions: predictions,
                myPositions: {
                  num: counter,
                  predictions: playerPredictions
                }
              }
            }
          }))
        }
      }
    }    
    handlePositions();
  }, [state.numOfPositions])

  useEffect(() => {    
    // CLEANUP  
    let isSubscribed = true; 
    const getAddress = async() => {
      const address = await web3.eth.getAccounts();
      setState(state => ({
        ...state,
        numOfPositions: 0,
        myAddress: '0x836E08dF90245B151C2eEDfCe6fBC1E690130544' 
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
            resolutionPeriod: resolutionPeriod,
            competitionPeriod: competitionPeriod,
            pricePredictionPeriod: pricePredictionPeriod,
            myPositions: {},
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
          let gameContract = new web3.eth.Contract(props.gameAbi, gameAddress)
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
      let timeLeft = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; 
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
    }, 10000);      
  }

  if (state.isLoading !== true ) {
    return (
      <div>
        <Graph productData={state.productData} />  
        <Switch>
          <Route exact path={path}>
            <Gamelist factoryContract={factoryContract} state={state} />              
          </Route>
          <Route 
            exact path={`${path}/game_:id`}
            render={({match}) => <Game
              gameState={state.games[match.params.id]} 
              myAddress={state.myAddress} 
              lastPrice={state.productData[0].close}
            />}
          />
        </Switch>
      </div>
    )  
  } else {
    return (
      <p>loading</p>
    ) 
  }  
}

export default withWeb3(SelectedProduct);