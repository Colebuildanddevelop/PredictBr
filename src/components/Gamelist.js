import React, { useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// COMPONENTS
import FormattedTime from './FormattedTime';
import CurrentGameState from './CurrentGameState';
import CreateGameDrawer from './CreateGameDrawer'

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },  
  gameCardContainer: {
    margin: 'auto',
    marginBottom: 20,
    maxWidth: '100%',
    minWidth: '100%',
  },
  gameCard: {
    height: 80,
    padding: 10,
    display: 'block',
    backgroundColor: '#424242',
    color: theme.palette.primary.light
  },
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
        alert(result)
      } else {
        alert(error)
      }
    })
  }  
  
  // inject into presentational components  
  // if statement wouldnt be necc if HOC didnt pass props until loaded
  if (props.state.games !== undefined && props.state.games !== null) {
    return (
      <React.Fragment>
        <CreateGameDrawer handleCreateGame={handleCreateGame} myAddress={props.state.myAddress}/>        
        <Grid container direction='column' style={{marginTop: 20}}>
          {Object.keys(props.state.games).map((game, key) => (
            <Grid item className={classes.gameCardContainer}>
              <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to={`${url}/game_${game}`}>                
                <Card className={classes.gameCard}>
                  <Grid item container>
                    {props.state.games[game].predictionPeriodCountdown.durationDated !== null ? (
                      <React.Fragment>
                        <Grid item container xs={6}>
                          <Grid item xs={12}>                                                      
                            <CurrentGameState game={props.state.games[game]} />
                            <FormattedTime
                              duration={props.state.games[game].predictionPeriodCountdown.durationDated} 
                              name={'start'}  
                            />          
                            <FormattedTime
                              duration={props.state.games[game].gameEndsCountdown.durationDated} 
                              name={'end'}  
                            />                                                                                                                          
                          </Grid>                                         
                        </Grid>
                        <Grid item xs={6} >     
                          <Grid item xs={12}>     
                            <Typography align='right'>
                              <div style={{fontWeight: 'bold', display: 'inline'}}>my positions: </div>{props.state.games[game].myPositions.num}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>        
                            <Typography align='right'>
                              <div style={{fontWeight: 'bold', display: 'inline'}}>stake: </div>{props.state.games[game].predictionCost / (10**18)} ETH
                            </Typography>                                                        
                            <Typography align='right'>
                              <div style={{fontWeight: 'bold', display: 'inline'}}>prize pool: </div>{props.state.games[game].totalPredictionPool / (10**18)} ETH
                            </Typography>                         
                          </Grid> 
                        </Grid>   
                      </React.Fragment>
                    ) : (
                      <Grid item container xs={12}>
                        <Grid item xs={12} style={{padding: 5}}>
                          <Typography align='center' style={{fontStyle: 'italic', fontWeight: 'light'}}>
                            loading game please wait!
                          </Typography>
                        </Grid>
                        <CircularProgress style={{margin: 'auto', color: 'green', padding: 5}}/>
                      </Grid>
                    )}                                                           
                  </Grid>                              
                </Card>
              </NavLink>    
            </Grid>
          ))}   
        </Grid>     
      </React.Fragment>  
    )
  } else {
    return (
      <React.Fragment>
        <CreateGameDrawer handleCreateGame={handleCreateGame} myAddress={props.state.myAddress}/>        
      </React.Fragment>

    )
  }
}

export default Gamelist;


