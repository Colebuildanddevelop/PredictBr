import React, {useEffect, useState} from 'react';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  howToPlayButton: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main
  },
  gameOption: {
    margin: 'auto',
    padding: 10,
    minHeight: '100vh'
  },  
  formControl: {    
    width: '95%',
    marginLeft: 10,
    marginBottom: 10,
  },  
}))

const HowToPlayDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    drawerOpen: false,   
  });

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
    <div style={{width: '100%'}}>
      <Button className={classes.howToPlayButton} fullWidth={true} variant='contained' onClick={toggleDrawer(true)}>How To Play</Button>
      <Drawer anchor="bottom" open={state.drawerOpen} onClose={toggleDrawer(false)}>
        <Grid container direction='column' className={classes.gameOption}>
          <Grid item xs={12}>
            <Button onClick={toggleDrawer(false)}>close</Button>
          </Grid>  
          <Typography align='center' variant='h6' style={{fontWeight: 'bolder'}}>
            Welcome!
          </Typography>
          <Typography align='left'>
            PredictBR is a 
            game where players compete 
            against each other in accurately 
            predicting the price of a given product at a given future point in time.
          </Typography>
          <Typography align='center' variant='h6' style={{fontWeight: 'bolder', marginTop: 20}}>
            example
          </Typography>
          <Typography align='left'>
            The SP500 SPY ETF is currently trading at 124.31. A PredictBr game is scheduled to start in one hour,
            the game will conclude one week from then. The cost to make a prediction for this particular PredictBr match is .01 ETH.
            Before the game starts, Player A sends in a prediction that the price will be 140 by the end of the week along with .01 ETH. 
            Player B sends in a prediction of 120 along with their respective .01 ETH. The game starts and no longer accepts predictions from players. 
            In one week when the game concludes the SP500 SPY ETF is trading at $100. A 24 hour resolution period begins. During this period Player B claims their prediction as the most accurate prediction.
            Player A, sees that Player B has claimed 120 as their winning prediction. Given that Player A's only prediction was 140, and that 140 is a less accurate prediction then the currently claimed most accurate postion (120). 
            Player A decides they cant claim a more accurate prediction. The resolution period ends. Player B's prediction remains the most accurate. Player B collects the entire balance of the game (.02 ETH)
            
          </Typography>


        </Grid>        
      </Drawer>
    </div>
  );
}

export default HowToPlayDrawer;