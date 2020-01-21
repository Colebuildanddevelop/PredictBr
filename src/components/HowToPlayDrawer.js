import React, {useEffect, useState} from 'react';
// IMG
import choseProductGif from '../static/choseProduct.gif'
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  howToPlayButton: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main
  },
  gameOption: {
    margin: 'auto',
    padding: 10,
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    overflow: 'auto'
  },  
  tutorialGif: {
    width: 300,
    margin: 'auto',
    padding: 20    
  }
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
        <Grid container className={classes.gameOption}>
          <Grid item xs={12}>
            <Button style={{color: 'white'}} onClick={toggleDrawer(false)}>close</Button>
            <Typography align='center' variant='h6' style={{fontWeight: 'bolder', width: '100%'}}>
              About
            </Typography>
            <Typography align='left'>
              PredictBr is a global permissionless competition where players compete by making predictions concerning the price of various assets at various future points in time.
              In order to place a prediciton, players must stake a given amount. When the competition concludes and a price has settled, the player with the most accurate prediction is entitled to the 
              total pot generated from predictions.
            </Typography>
            <Divider variant='fullWidth' style={{fontWeight: 5, backgroundColor: 'white', marginTop: 20, marginBottom: 20}}/>
            <Typography align='left' variant='h6' style={{fontWeight: 'bolder', marginTop: 20}}>
              Step One:
            </Typography>
            <Typography align='center'>
              Choose one of the availible financial products 
            </Typography> 
            <Grid item xs={12} className={classes.tutorialGif}>
              <img src={choseProductGif}  style={{width: '100%'}} />
            </Grid>       
            <Divider variant='fullWidth' style={{fontWeight: 5, backgroundColor: 'white', marginTop: 20, marginBottom: 20}}/>
            <Typography align='left' variant='h6' style={{fontWeight: 'bolder', marginTop: 20}}>
              Step Two:
            </Typography>
            <Typography align='center'>
              Chose a game that has not started
            </Typography> 
            <Grid item xs={12} className={classes.tutorialGif} >
              <img src={choseProductGif} style={{width: '100%'}} />
            </Grid>                   
          </Grid>  

        </Grid>        
      </Drawer>
    </div>
  );
}

export default HowToPlayDrawer;