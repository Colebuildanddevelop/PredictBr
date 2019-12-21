import React from 'react';
import Graph from './Graph';
import SampleGraph from './SampleGraph'
import { NavLink } from 'react-router-dom';
// MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  productSquare: {
    margin: 'auto',
    padding: 10
  },
  button: {
    width: 150,
    height: 150
  }
}));

const ProductSelection = () => {
  const classes = useStyles();              

  return (
    <div>
      <Grid container direction='column'>
        <Grid item className={classes.productSquare}>
          <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to='/SPY'>
            <Button variant='contained' className={classes.button}>
              <p>sp 500</p>  
            </Button>
          </NavLink>
        </Grid>
        <Grid item className={classes.productSquare}>
          <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to='/GLD'>
            <Button variant='contained' className={classes.button}>
              <p>gold</p>  
            </Button>
          </NavLink>            
        </Grid>
        <Grid item className={classes.productSquare}>
          <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to='/USO'>
            <Button variant='contained' className={classes.button}>
              <p>USO</p>  
            </Button>
          </NavLink>
        </Grid>
        <Grid item className={classes.productSquare}>            
          <NavLink style={{ textDecoration: 'none', color: 'unset' }} color="inherit" to='/ETH'>
            <Button variant='contained' className={classes.button}>
              <p>ethereum</p> 
            </Button>           
          </NavLink>  
        </Grid>                              
      </Grid>                      
    </div>  
  )
}

export default ProductSelection;