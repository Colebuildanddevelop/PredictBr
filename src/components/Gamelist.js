import React, { useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  gameCardContainer: {
    margin: 'auto',
    maxWidth: '100%',
    minWidth: '100%'
  },
  gameCard: {
    height: 300,
    display: 'block'
  }
}));

const FormattedTime = (props) => {
  // add a 0 to minutes less than 10
  if (props.duration.getMinutes() < 10) {
    return (
      <Typography align='left'>
        {props.name}: {props.duration.getMonth() + 1}/{props.duration.getDate() + 1}, {props.duration.getHours()}:0{props.duration.getMinutes()} 
      </Typography>         
    )
  } else {
    return (
      <Typography align='left'>
        {props.name}: {props.duration.getMonth() + 1}/{props.duration.getDate() + 1}, {props.duration.getHours()}:{props.duration.getMinutes()} 
      </Typography>         
    )
  }
}


const CurrentGameState = (props) => {
  if (props.game.predictionPeriodCountdown.isOver === true) {
    if (props.game.gameEndsCountdown.isOver === true) {  
      if (props.game.resolutionPeriodCountdown.isOver === true) {
        return (                  
        <Typography align='left'>
          game has resolved
        </Typography>                
      )} else {
        return (                  
        <Typography align='left'>
          resolution period {props.game.resolutionPeriodCountdown.timeLeft}
        </Typography>                
      )} 
    } else {
      return (              
      <Typography align='left'>
        game has started {props.game.gameEndsCountdown.timeLeft}
      </Typography>            
    )}
  } else {
    return (          
    <Typography align='left'>
      prediction period {props.game.predictionPeriodCountdown.timeLeft}
    </Typography>        
  )}
}


// gets a list of all availible and expired games
const Gamelist = (props) => {
  const classes = useStyles();
  let { url } = useRouteMatch();

   
  // create game functionality 
  // handle click for creating a Game
  const handleCreateGame = (
    playerAddress,
    gameName, 
    predictionCost, 
    timeToStart, 
    durationMinutes
    ) => {
    props.factoryContract.methods.createGame(
      gameName, 
      predictionCost, 
      timeToStart, 
      durationMinutes
    ).send({
      from: playerAddress
    })
    .then((error, result) => {
      if (!error) {
        console.log(result)
      } else {
        console.log(error)
      }
    })
  }  
  
  // inject into presentational components  
  // if statement wouldnt be necc if HOC didnt pass props until loaded
  if (props.state.games !== undefined || null) {
    return (
      <div>
        <Button variant='contained' onClick={() => handleCreateGame(props.state.myAddress, "spy", 1000000000000000, 50, 1)}>create game</Button>
        <Button variant='contained' onClick={() => {console.log(props)}}>click</Button>
        <Grid container direction='column' style={{marginTop: 20}}>
          {Object.keys(props.state.games).map((game, key) => (
            <Grid item className={classes.gameCardContainer}>
              <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to={`${url}/game_${game}`}>                
                <Card className={classes.gameCard}>
                  <Grid item container>
                    <Grid item container xs={4}>
                      <Grid item  xs={12}>
                        {props.state.games[game].predictionPeriodCountdown.durationDated !== null &&
                          <CurrentGameState game={props.state.games[game]} />
                        }
                      </Grid> 
                      <Grid item xs={12}>                        
                        {props.state.games[game].predictionPeriodCountdown.durationDated !== null &&
                          <FormattedTime
                            duration={props.state.games[game].predictionPeriodCountdown.durationDated} 
                            name={'start'}  
                          />                             
                        }                                                  
                      </Grid> 
                      <Grid item xs={12}>
                        {props.state.games[game].predictionPeriodCountdown.durationDated !== null &&
                          <FormattedTime
                            duration={props.state.games[game].gameEndsCountdown.durationDated} 
                            name={'end'}  
                          />                             
                        }   
                      </Grid>                                             
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align='center' variant='h5'>
                        {props.state.games[game].predictionCost / (10**18)} ETH
                      </Typography>
                    </Grid>
                    <Grid item xs={4} >
                      <Grid item xs={12}>
                        <Typography align='right'>
                          total prize: {props.state.games[game].totalPredictionPool / (10**18)} ETH
                        </Typography>
                      </Grid> 
                      <Grid item xs={12}>
                        <Typography align='right'>
                          my positions : {props.state.games[game].myPositions.num}
                        </Typography>
                      </Grid>  
                    </Grid>                                        
                  </Grid>                              
                </Card>
              </NavLink>    
            </Grid>
          ))}   
        </Grid>
     
      </div>  
    )
  } else {
    return (
      <div>
        <button onClick={() => handleCreateGame(props.state.myAddress, "spy", 1000000000000000000, 5, 1)}>create game</button>
        <button onClick={() => {console.log(props)}}>click</button>      
        <p>loading games</p>
      </div>

    )
  }

}

export default Gamelist;

