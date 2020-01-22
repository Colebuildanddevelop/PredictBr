import React, {useEffect, useState} from 'react';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  createGameButton: {
    background: 'linear-gradient(45deg, #00e676 30%, #51ccf5 90%)',
    color: theme.palette.primary.main,
  },
  gameOptionContainer: {
    margin: 'auto',
    backgroundColor: theme.palette.primary.main,
  },
  snackbar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },    
  formControl: {    
    width: '95%',
    marginLeft: 10,
    marginBottom: 10,
  }, 
  underline: {
    borderBottom: '1px solid white'
  },
  icon: {
    color: 'white'
  },
  select: {
    color: 'white',
    backgroundColor: theme.palette.primary.main
  },
  option: {
    color: 'white',
    backgroundColor: theme.palette.primary.main
  },
  selectMenu: {
    color: 'black',
    backgroundColor: theme.palette.primary.main
  }
}))

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
    <React.Fragment>
      <Button className={classes.createGameButton} fullWidth={true} variant='contained' onClick={toggleDrawer(true)}>Create Game</Button>
      <Drawer anchor="bottom" open={state.drawerOpen} onClose={toggleDrawer(false)}>
        <Grid container direction='column' className={classes.gameOptionContainer}>
          <Grid item>
            <Typography align='center' style={{margin: 10, color: 'white'}}>
              please choose
            </Typography> 
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel style={{color: 'white'}}>stakes...</InputLabel>
              <NativeSelect
                native
                value={state.age}
                onChange={handleChange('stakes')}
                classes={{
                  icon: classes.icon,
                  selectMenu: classes.selectMenu,
                  select: classes.select
                }}
                input={<Input classes={{
                  underline: classes.underline,
                }}/>}                       
              >                
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={100000000000000}>.0001 ETH</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={1000000000000000}>.001 ETH</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={10000000000000000}>.01 ETH</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={100000000000000000}>.1 ETH</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={1000000000000000000}>1 ETH</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={10000000000000000000}>10 ETH</option>                                
              </NativeSelect>
            </FormControl>          
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel style={{color: 'white'}}>game will start in one...</InputLabel>
              <NativeSelect
                native
                value={state.age}
                onChange={handleChange('start')}  
                classes={{
                  icon: classes.icon,
                  selectMenu: classes.selectMenu,
                  select: classes.select
                }}
                input={<Input classes={{
                  underline: classes.underline,
                }}/>}                         
              >
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={60}>hour</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={1440}>day</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={10080}>week</option>
              </NativeSelect>
            </FormControl>  
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel style={{color: 'white'}}>game will run for one...</InputLabel>
              <NativeSelect
                native
                value={state.age}
                onChange={handleChange('end')}  
                classes={{
                  icon: classes.icon,
                  selectMenu: classes.selectMenu,
                  select: classes.select
                }}
                input={<Input classes={{
                  underline: classes.underline,
                }}/>}                 
              >
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={60}>hour</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={1440}>day</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={10080}>week</option>
                <option style={{backgroundColor: '#212121', color: '#eceff1'}} value={43800}>month</option>
              </NativeSelect>
            </FormControl>  
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              fullWidth={true} 
              style={{
                color: '#212121',
                backgroundColor: '#ff3333'
              }}
              onClick={() => props.handleCreateGame(props.myAddress, "spy", state.stakes, state.start, state.end)}
            >
              create game
            </Button>
          </Grid>          
        </Grid>        
      </Drawer>
    </React.Fragment>
  );
}

export default CreateGameDrawer;




const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CustomizedSnackbars = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.snackbar}>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} color="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Alert color="error">This is an error message!</Alert>
      <Alert color="warning">This is a warning message!</Alert>
      <Alert color="info">This is an information message!</Alert>
      <Alert color="success">This is a success message!</Alert>
    </div>
  );
}