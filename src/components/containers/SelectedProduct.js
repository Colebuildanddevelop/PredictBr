import React, {useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { withWeb3 } from 'react-web3-provider';
import Gamelist from '../Gamelist';
import Game from '../Game';
import Graph from '../Graph';
// HOOKS 
import { useGraph } from '../../hooks/useGraph';
import { useGameData } from '../../hooks/useGameData';
// MATERIAL UI 


const SelectedProduct = (props) => {
  // REACT ROUTER
  let { path } = useRouteMatch();  
  // get the game list for the associated product    
  const { web3 } = props;  
  const [state, setState] = useState({
    isLoading: true,
    games: null,
  })
  // get graph data using hook
  let graphData = useGraph(props.contractData)  
  useEffect(() => {
    console.log('loading')
    setState( state => ({
      ...state,
      productData: graphData
    }))
  }, [graphData])
  // games data hook
  const factoryContract = new web3.eth.Contract(props.contractData.factoryAbi, props.contractData.factoryAddress);  
  let gamesData = useGameData(web3, factoryContract, props.contractData.gameAbi)
  useEffect(() => {

    const handlePositions = (games, myAddress) => {
      console.log(games !== undefined)
      console.log('handling positions')
      // key is gameAddress, value is gameState
      if (games !== undefined && games !== null) {
        for (let [key, value] of Object.entries(games)) {
          console.log('entires')
          let counter = 0;
          let playerPredictions = [];
          // predictions.price.count
          let predictions = {};
          // for each position
          value.positions.forEach(position => {       
            // get players positions     
            console.log(position.predictionPrice)
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
          console.log(playerPredictions)
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
    setState(state => ({
      ...state,
      games: gamesData.games,
      myAddress: gamesData.myAddress,
      numOfPositions: gamesData.numOfPositions
    }))    
    handlePositions(gamesData.games, gamesData.myAddress)       
    setState(state => ({
      ...state,
      isLoading: false,
    })) 
  }, [gamesData])


  if (state.isLoading !== true) {
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