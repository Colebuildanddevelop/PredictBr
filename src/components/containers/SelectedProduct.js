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
    let isSubscribed = true;    
    const getAddress = async() => {
      const address = await web3.eth.getAccounts();
      if (isSubscribed === true) {
        setState(state => ({
          ...state,
          numOfGames: 0,
          myAddress: address 
        }))
        console.log(address)
      }
    }
    getAddress();
    return () => isSubscribed = false;
  }, [])

  useEffect(() => {
    // CLEANUP  
    let isSubscribed = true;    
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
            positions: [],
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
    const subscribeToData = async () => {
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
        } else {
          console.log(error)
        }
      })        
    }
    if (isSubscribed === true) {
      // for each contract get gameData
      subscribeToData();
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
        <Graph product={props.graphUrl} timeSeriesKey={props.timeSeriesKey} OHLCKeys={props.OHLCKeys}/>  
        <Switch>
          <Route exact path={path}>
            <Gamelist factoryContract={factoryContract} state={state} />              
          </Route>
          <Route 
            exact path={`${path}/game_:id`}
            render={({match}) => <Game
              gameState={state.games[match.params.id]} 
              myAddress={state.myAddress} 
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