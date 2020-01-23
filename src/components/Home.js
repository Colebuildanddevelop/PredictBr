import React from 'react';
// COMPONENTS
import HowToPlayDrawer from './HowToPlayDrawer';
// React Router
import { NavLink } from 'react-router-dom';
// MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  heading: {
    marginTop: 50
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main
  },
  buttonContainer: {
    width: '100%',
    padding: 5,
    [theme.breakpoints.up('sm')]: {
      width: '30%',
    }
  }
}));
/**
 * @desc landing page, exposes a tutorial option or starts the main app flow
 * @param none
 * @return Home Component 
 */
const Home = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.mainContainer}> 
      <Grid item xs={12} className={classes.heading}>
        <Typography align='center' fullWidth={true} variant='h3' style={{fontWeight: 'bold', color: 'white'}}>
          Welcome
        </Typography>
        <Typography align='center' fullWidth={true} variant='h6' style={{fontWeight: 'lighter', color: 'white'}}>
          A portal to a financial forecasting competition hosted on Ethereum
        </Typography>
      </Grid>
      <Grid item container xs={12} style={{justifyContent: 'center', marginTop: 10}}>
        <Grid item className={classes.buttonContainer}>
          <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to='/ProductSelection'>
            <Button variant='contained' className={classes.button} style={{width: '100%'}}>
              start 
            </Button>
          </NavLink>
        </Grid>
        <Grid item className={classes.buttonContainer} >
          <HowToPlayDrawer/>
        </Grid>   
      </Grid>      
    </Grid>

  )
}

export default Home;