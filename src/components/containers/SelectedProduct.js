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
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';


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
    setState( state => ({
      ...state,
      productData: graphData
    }))
  }, [graphData])
  
  // games data hook
  const factoryContract = new web3.eth.Contract(props.contractData.factoryAbi, props.contractData.factoryAddress);  
  let gamesData = useGameData(web3, factoryContract, props.contractData.gameAbi)
  useEffect(() => {
    const handlePositions = async (games, myAddress) => {
      // key is gameAddress, value is gameState
      if (games !== undefined && games !== null) {
        for (let [key, value] of Object.entries(games)) {
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
    setState(state => ({
      ...state,
      games: gamesData.games,
      myAddress: gamesData.myAddress,
      numOfPositions: gamesData.numOfPositions
    }))    
    handlePositions(gamesData.games, gamesData.myAddress)       
    if (gamesData.games !== undefined && graphData !== null) {
      setState(state => ({
        ...state,
        isLoading: false,
      })) 
    }

  }, [gamesData.games])


  if (state.isLoading !== true) {
    return (
      <div>
       
        <Typography align='center' variant='h5' style={{fontWeight: 'bold'}}>
          {props.productName}
        </Typography>            
      

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
      <Grid container style={{margin: 'auto', width: '100%'}}>
        <Typography align='center' style={{margin: 'auto'}}>
          gathering game information, please wait!  
        </Typography>
        <CircularProgress style={{margin: 'auto', color: 'green', padding: 5}}/>      
      </Grid>
    ) 
  }  
}

export default withWeb3(SelectedProduct);