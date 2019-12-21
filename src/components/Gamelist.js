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
    height: 100,
    display: 'block'
  }
}));


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
        <Button variant='contained' onClick={() => handleCreateGame(props.state.myAddress[0], "spy", 1000000000, 5, 1)}>create game</Button>
        <Button variant='contained' onClick={() => {console.log(props)}}>click</Button>
        <Grid container direction='column' style={{marginTop: 20}}>
          {Object.keys(props.state.games).map((game, key) => (
            <Grid item className={classes.gameCardContainer}>
              <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to={`${url}/game_${game}`}>                
                <Card className={classes.gameCard}>
                  <Grid item container>
                    <Grid item container xs={4}>
                      <Grid item  xs={12}>
                        <Typography align='left'>
                          state
                        </Typography>
                      </Grid> 
                      <Grid item xs={12}>
                        
                          {props.state.games[game].predictionPeriodCountdown.durationDated !== null &&
                            <Typography align='left'>
                              start: {props.state.games[game].predictionPeriodCountdown.durationDated.getDay()} / {props.state.games[game].predictionPeriodCountdown.durationDated.getDay()}
                            </Typography>                              
                          }
                          
                        
                      </Grid> 
                      <Grid item xs={12}>
                        <Typography align='left'>
                          end:
                        </Typography>
                      </Grid>                       

                    </Grid>
                    <Grid item xs={4}>
                      <Typography align='center' variant='h5'>
                        name
                      </Typography>
                    </Grid>
                    <Grid item xs={4} >
                      <Grid item xs={12}>
                        <Typography align='right'>
                          right
                        </Typography>
                      </Grid> 
                      <Grid item xs={12}>
                        <Typography align='right'>
                          right
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
        <button onClick={() => handleCreateGame(props.state.myAddress[0], "spy", 1000000000, 5, 1)}>create game</button>
        <button onClick={() => {console.log(props)}}>click</button>      
        <p>loading games</p>
      </div>

    )
  }

}

export default Gamelist;

