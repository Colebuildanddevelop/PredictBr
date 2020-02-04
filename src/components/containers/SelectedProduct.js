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
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Link from '@material-ui/core/Link';
// WEB3
import web3 from '../../web3';

const useStyles = makeStyles(theme => ({
  graphContainer: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 800,
      margin: 'auto'
    }
  },
  gamelistContainer: {
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70%'
    }
  },
  productName: {
    fontWeight: 'bold',
    color: 'white', 
  }
}));


/**
 * @desc 
 *   - a HOC to GameList, Graph
 *   - gets game states from Ethereum network
 * @param props - passed from Navigation
 *   - ContractData, used to connect to the Ethereum smart contracts
 * @return SelectedProduct Component 
 */
const SelectedProduct = (props) => {
  
  const classes = useStyles()
  // REACT ROUTER
  let { path } = useRouteMatch();  
  const [state, setState] = useState({
    isLoading: true,
    games: null,
  })

  // get graph data using hook
  let graphData = useGraph(props.contractData)  
  useEffect(() => {
    setState( state => ({
      ...state,
      productData: graphData,
    }))
  }, [graphData])

  // games data hook
  const factoryContract = new web3.eth.Contract(props.contractData.factoryAbi, props.contractData.factoryAddress);  
  let gamesData = useGameData(web3, factoryContract, props.contractData.gameAbi)
  useEffect(() => {
    // formats position data from Ethereum, shows user their postions respective of the game
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
    }))    
    handlePositions(gamesData.games, gamesData.myAddress)     
    // handle loading  
    if (gamesData.games !== undefined && graphData !== null) {
      setState(state => ({
        ...state,
        isLoading: false,
      })) 
    }
  }, [gamesData.games])
  if (gamesData.metaMaskDetected === false) {
    return (
      <Grid container style={{marginTop: 'auto', width: '100%'}}>
        <Typography align='center' variant='h3' style={{margin: 'auto', color: 'white', width: '100%', marginBottom: 20}}>
          Whoops! 
        </Typography>        
        <Typography align='center' style={{margin: 'auto', color: 'white', width: '100%'}}>
          PredictBR requires a web3 connection capable of subscribing to the Ethereum Network. We recommend using Metamask! Download and information can be found at 
          <Link href='https://metamask.io/' style={{color: 'inherit', marginLeft: 5}}>
            https://metamask.io/!
          </Link>
        </Typography>
      </Grid>
    )
  }
  if (state.isLoading !== true) {
    return (
      <React.Fragment>
        <Typography align='center' variant='h4' className={classes.productName} >
          {props.productName}
        </Typography>
        <Zoom timeout={750} in={true}>
          <Grid container>
            <Grid item className={classes.graphContainer} >
              <Graph productData={state.productData} />  
            </Grid>
            <Grid item className={classes.gamelistContainer}>         
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
            </Grid>   
          </Grid>  
        </Zoom>            
      </React.Fragment>
    )  
  } else {
    return (
      <Grid container style={{marginTop: 'auto', width: '100%'}}>
        <Typography align='center' style={{margin: 'auto', color: 'white', width: '100%'}}>
          gathering game information, please wait!  
        </Typography>
        <CircularProgress style={{margin: 'auto', color: 'green', padding: 5}}/>      
      </Grid>
    ) 
  }  
}

export default (SelectedProduct);