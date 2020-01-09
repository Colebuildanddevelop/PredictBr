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
    backgroundColor: 'white'
  },
  gameOption: {
    margin: 'auto',
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
        </Grid>        
      </Drawer>
    </div>
  );
}

export default HowToPlayDrawer;