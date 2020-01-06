import React, { useState, useEffect } from 'react';
// MATERIAL UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const sliderShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
// taken from material ui documentation
const CustomSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: sliderShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: sliderShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

const useStyles = makeStyles(theme => ({
  predictions: {
    width: '100%'
  },
  controlPanel: {
    marginTop: 20
  }
}));




/*
 *  allows user to interact with the game contract
 */
const Game = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    predictionVal: '',
  });

  const handleSlider = (e) => {
    setState({
      predictionVal: e.target.innerText
    })
    console.log(state)

  }

  // send user prediction and staked eth
  const handlePredict = () => {
    let value = parseInt(props.gameState.predictionCost, 10)
    let predictionInt = parseInt(state.predictionVal, 10)
    props.gameState.gameContract.methods.predict(predictionInt).send(
      {
        from: props.myAddress, 
        value: value,
        gas: 3000000
      })
      .then((err, res) => {
        if (!err) {
          console.log(res)
        } else {
          console.log(err)
        }
      })      
  }

  // claim most accurate position
  const handleClaimWinningPrediction = async() => {
    let differences = [];
    // get users positions and convert to differences    
    let numOfPositions = await props.gameState.gameContract.methods.prediction_number(props.myAddress).call()
    for (let i=0; i<numOfPositions; i++) {
      let userPrediction = await props.gameState.gameContract.methods.positions(props.myAddress, i).call()
      differences.push((Math.abs(userPrediction - parseInt(props.gameState.assetPrice))))
    }
    // find the most accurate prediciton
    let closestPrediction = Math.min.apply(Math, differences)
    let indexOfClosestPrediction = differences.indexOf(closestPrediction)
    // call claim winning prediciton
    props.gameState.gameContract.methods.claim_winning_prediction(indexOfClosestPrediction)
      .send({
        from: props.myAddress
      })
      .then((err, res) => {
        if (!err) {
          console.log(res)
        } else {
          console.log(err)
        }
      })
  }

  // collect winnings 
  const collectWinnings = () => {
    props.gameState.gameContract.methods.collect_my_winnings()
      .send({
        from: props.myAddress
      })
  }
  
  return (
    <div>    
      <button onClick={() => console.log(props)}></button>
      <Grid container style={{marginTop: 20}}>        
        <Grid item container>
          <Typography align='left' className={classes.predictions}>
            my predictions
          </Typography>
          {props.gameState.myPositions.predictions.length > 0 &&
            props.gameState.myPositions.predictions.map(prediction => {
              return (
                <Typography align='left' className={classes.predictions}>
                  {prediction}
                </Typography>
              )
            })   
          }                             
          <Grid item container xs={12}>
            <Grid item xs={6}>                  
              <Typography align='left'>
                prediction price
              </Typography>                            
            </Grid>   
            <Grid item xs={6}>                  
              <Typography align='right' >
                total predictions
              </Typography>                       
            </Grid> 
          </Grid>    
          {props.gameState.countedPredictions !== null &&
            Object.keys(props.gameState.countedPredictions).map(prediction => {
              return (     
                <Grid item container xs={12}>
                  <Grid item xs={6}>                  
                    <Typography align='left'>
                      {prediction}
                    </Typography>                                
                  </Grid>   
                  <Grid item xs={6}>                  
                    <Typography align='right' >
                      {props.gameState.countedPredictions[prediction]}
                    </Typography>                       
                  </Grid> 
                </Grid>                                    
              )
            })
          }                                        
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12} className={classes.controlPanel}>
            <CustomSlider 
              aria-label="slider"
              defaultValue={Math.floor(props.lastPrice)} 
              max={Math.floor(props.lastPrice) * 5}
              valueLabelDisplay="on" 
              onChange={handleSlider}
              aria-valuetext={state.predictionVal}     
              step={1}         
            />
            <Button 
              variant='contained' 
              style={{width: '100%'}} 
              onClick={handlePredict}
            >
              predict
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.controlPanel}>
            <Button 
              variant='contained' 
              style={{width: '100%'}} 
              onClick={handleClaimWinningPrediction}
            >
              claim winning prediction
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.controlPanel}>
            <Button 
              variant='contained' 
              style={{width: '100%'}} 
              onClick={collectWinnings}
            >
              collect winnings
            </Button>
          </Grid>                  
        </Grid>
      </Grid>
    </div>
  )
}

export default Game;







