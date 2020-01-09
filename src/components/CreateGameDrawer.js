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
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  createGameButton: {
    background: 'linear-gradient(45deg, #5ee07d 30%, #51ccf5 90%)',
    color: 'white'
  },
  gameOption: {
    margin: 'auto',
    backgroundColor: '#e8e8e8'
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
    <div>
      <Button className={classes.createGameButton} fullWidth={true} variant='contained' onClick={toggleDrawer(true)}>Create Game</Button>
      <Drawer anchor="bottom" open={state.drawerOpen} onClose={toggleDrawer(false)}>
        <Grid container direction='column' className={classes.gameOption}>
          <Grid item>
            <Typography align='center' style={{margin: 10, color: 'black'}}>
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
            <Button
              variant='contained'
              fullWidth={true} 
              style={{
                color: 'white',
                backgroundColor: '#ff3333'
              }}
              onClick={() => props.handleCreateGame(props.myAddress, "spy", state.stakes, state.start, state.end)}
            >
              create game
            </Button>
          </Grid>          
        </Grid>        
      </Drawer>
    </div>
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