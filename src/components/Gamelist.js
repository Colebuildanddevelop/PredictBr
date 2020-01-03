import React, { useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';



const useStyles = makeStyles(theme => ({
  formControl: {    
    width: '95%',
    marginLeft: 10,
    marginBottom: 10,
  },
  gameOption: {
    margin: 'auto'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },  
  fullList: {
    width: 'auto',
  },  
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
  if (props.state.gamesData.games !== undefined || null) {
    return (
      <div>
        <Button onClick={() => console.log(props)}>state</Button>
        <CreateGameDrawer handleCreateGame={handleCreateGame} myAddress={props.state.myAddress}/>        
        <Grid container direction='column' style={{marginTop: 20}}>
          {Object.keys(props.state.gamesData.games).map((game, key) => (
            <Grid item className={classes.gameCardContainer}>
              <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to={`${url}/game_${game}`}>                
                <Card className={classes.gameCard}>
                  <Grid item container>
                    <Grid item container xs={4}>
                      <Grid item  xs={12}>
                        {props.state.gamesData.games[game].predictionPeriodCountdown.durationDated !== null &&
                          <CurrentGameState game={props.state.gamesData.games[game]} />
                        }
                      </Grid> 
                      <Grid item xs={12}>                        
                        {props.state.gamesData.games[game].predictionPeriodCountdown.durationDated !== null &&
                          <FormattedTime
                            duration={props.state.gamesData.games[game].predictionPeriodCountdown.durationDated} 
                            name={'start'}  
                          />                             
                        }                                                  
                      </Grid> 
                      <Grid item xs={12}>
                        {props.state.gamesData.games[game].predictionPeriodCountdown.durationDated !== null &&
                          <FormattedTime
                            duration={props.state.gamesData.games[game].gameEndsCountdown.durationDated} 
                            name={'end'}  
                          />                             
                        }   
                      </Grid>                                             
                    </Grid>
                    <Grid item xs={4}>
                      <Typography align='center' variant='h5'>
                        {props.state.gamesData.games[game].predictionCost / (10**18)} ETH
                      </Typography>
                    </Grid>
                    <Grid item xs={4} >
                      <Grid item xs={12}>
                        <Typography align='right'>
                          total prize: {props.state.gamesData.games[game].totalPredictionPool / (10**18)} ETH
                        </Typography>
                      </Grid> 
                      <Grid item xs={12}>
                        <Typography align='right'>
                          my positions : {props.state.gamesData.games[game].myPositions.num}
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
        <p>loading games</p>
      </div>

    )
  }
}

export default Gamelist;






const CreateGameDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    drawerOpen: false,   
    stakes: 100000000000000,
    start: 60,
    end: 60 
  });
  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const toggleDrawer = open => event => {
    console.log(state)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({
      ...state,
      drawerOpen: open
    });
  };

  return (
    <div>
      <Button fullWidth={true} variant='contained' onClick={toggleDrawer(true)}>Create Game</Button>
      <Drawer anchor="bottom" open={state.drawerOpen} onClose={toggleDrawer(false)}>
        <Grid container direction='column' className={classes.gameOption}>
          <Grid item>
            <Typography align='center' style={{margin: 10}}>
              please choose
            </Typography> 
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel>stakes...</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleChange('stakes')}  
              >                
                <option value={100000000000000}>.0001 ETH</option>
                <option value={1000000000000000}>.001 ETH</option>
                <option value={10000000000000000}>.01 ETH</option>
                <option value={100000000000000000}>.1 ETH</option>
                <option value={1000000000000000000}>1 ETH</option>
                <option value={10000000000000000000}>10 ETH</option>                                
              </Select>
            </FormControl>          
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel>game will start in one...</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleChange('start')}  
              >
                <option value={60}>hour</option>
                <option value={1440}>day</option>
                <option value={10080}>week</option>
              </Select>
            </FormControl>  
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel>game will run for one...</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleChange('end')}  
              >
                <option value={60}>hour</option>
                <option value={1440}>day</option>
                <option value={10080}>week</option>
                <option value={43800}>month</option>
              </Select>
            </FormControl>  
          </Grid>
          <Grid item>
            <Button variant='contained' fullWidth={true} onClick={() => props.handleCreateGame(props.myAddress, "spy", state.stakes, state.start, state.end)}>create game</Button>
          </Grid>          
        </Grid>        
      </Drawer>
    </div>
  );
}




