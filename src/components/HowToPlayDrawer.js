import React, {useEffect, useState} from 'react';
// IMG
import choseProductGif from '../static/choseProduct.gif';
import choseGameGif from '../static/choseGame.gif';
import predictGif from '../static/predict.gif';
import claimWinningGif from '../static/claimWinning.gif';
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main
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
/**
 * @desc displays tutorial information
 * @param none
 * @return HowToPlayDrawer Component 
 */
const HowToPlayDrawer = () => {
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
      <Button className={classes.howToPlayButton} fullWidth={true} variant='outlined' onClick={toggleDrawer(true)}>How To Play</Button>
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
            <Typography align='left' variant='h6' style={{fontWeight: 'bolder', marginTop: 20, display: 'inline'}}>
              Step One:
            </Typography>
            <Typography align='center' variant='h6' style={{display: 'inline', paddingLeft: 10, fontWeight: 'lighter'}}>
              Choosing a Product
            </Typography>  
            <Grid item xs={12} className={classes.tutorialGif}>
              <img src={choseProductGif}  style={{width: '100%'}} />
            </Grid>     
            <Typography align='left'>
              PredictBR offers the following products 
            </Typography>   
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              - SPDR® S&P 500® ETF Trust SPY
            </Typography> 
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              - SPDR® Gold Shares (GLD)
            </Typography> 
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              - United States Oil Fund, LP (USO)
            </Typography> 
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              - Ethereum
            </Typography> 
            <Divider variant='fullWidth' style={{fontWeight: 5, backgroundColor: 'white', marginTop: 20, marginBottom: 20}}/>
            <Typography align='left' variant='h6' style={{fontWeight: 'bolder', marginTop: 20, display: 'inline'}}>
              Step Two:
            </Typography>
            <Typography align='center' variant='h6' style={{display: 'inline', paddingLeft: 10, fontWeight: 'lighter'}}>
              Finding a Game
            </Typography>              
            <Grid item xs={12} className={classes.tutorialGif} >
              <img src={choseGameGif} style={{width: '100%'}} />
            </Grid>          
            <Typography align='center' style={{marginBottom: 20}}>
              Chose a game with an appropriate staking fee that has not yet started
            </Typography>     
            <Typography align='left'>
              Game States:
            </Typography>    
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              - Prediction Period (anytime before a game starts)
            </Typography> 
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              - Running Period (game has started, predictions no longer accepted)
            </Typography> 
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              - Resolution Period (a price has settled, players claim winning predictions) 
            </Typography>    
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              - Resolved (claims are no longer accepted, the player with the most accurately claimed prediciton is eligible to their winnings) 
            </Typography>   
            <Divider variant='fullWidth' style={{fontWeight: 5, backgroundColor: 'white', marginTop: 20, marginBottom: 20}}/>
            <Typography align='left' variant='h6' style={{fontWeight: 'bolder', marginTop: 20, display: 'inline'}}>
              Step Three:
            </Typography>
            <Typography align='center' variant='h6' style={{display: 'inline', paddingLeft: 10, fontWeight: 'lighter'}}>
              making predictions
            </Typography>  
            <Grid item xs={12} className={classes.tutorialGif} >
              <img src={predictGif} style={{width: '100%'}} />
            </Grid>   
            <Typography align='left'>
              Rules & Considerations:
            </Typography>    
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              1. Players are free to predict as much as they chose up until the moment the game starts.  
            </Typography>  
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              2. Players can predict prices that have already been predicted, if multiple players have a winning prediction the pot will be distributed equally amongst them.   
            </Typography>     
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              3. Your predictions will appear under "My Positions" while the games total recorded positions will appear under "All Predictions".
            </Typography>           
            <Divider variant='fullWidth' style={{fontWeight: 5, backgroundColor: 'white', marginTop: 20, marginBottom: 20}}/>
            <Typography align='left' variant='h6' style={{fontWeight: 'bolder', marginTop: 20, display: 'inline'}}>
              Step Four:
            </Typography>
            <Typography align='center' variant='h6' style={{display: 'inline', paddingLeft: 10, fontWeight: 'lighter'}}>
              claim what's yours!
            </Typography>  
            <Grid item xs={12} className={classes.tutorialGif} >
              <img src={claimWinningGif} style={{width: '100%'}} />
            </Grid>    
            <Typography align='left'>
              Rules & Considerations:
            </Typography>    
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              1. At the end of a games duration, a price will be settled and a resolution period will began.    
            </Typography>        
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              2. During the resolution period, players are eligible to claim their predictions as the most accurate. 
            </Typography>     
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              3. The current winning prediction will be displayed under "winnning prediction" so that players can judge if they have a more accurate prediction. 
            </Typography>          
            <Typography align='left' style={{marginTop: 10, marginLeft: 10, fontWeight: 'lighter'}}>
              4. When the resolution period ends, predictions can no longer be claimed as more accurate so be sure to claim your winners!
            </Typography>      
            <Divider variant='fullWidth' style={{fontWeight: 5, backgroundColor: 'white', marginTop: 20, marginBottom: 20}}/>
            <Typography align='left' variant='h6' style={{fontWeight: 'bolder', marginTop: 20, display: 'inline'}}>
              Step Five:
            </Typography>     
            <Typography align='center' variant='h6' style={{display: 'inline', paddingLeft: 10, fontWeight: 'lighter'}}>
              collect your earnings!
            </Typography>                  
          </Grid>  

        </Grid>        
      </Drawer>
    </div>
  );
}

export default HowToPlayDrawer;