import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
// ROUTER
import { useRouteMatch } from 'react-router-dom';
// DATA
import { ContractData } from '../../ContractData';
// COMPONENTS
import Home from '../Home';
import ProductSelection from '../ProductSelection';
import SelectedProduct from './SelectedProduct';
import NavBar from '../NavBar';
import Footer from '../Footer';
// MATERIAL UI
import { makeStyles, createPalette } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles(theme => ({
  appContainer: {
    minHeight: '100vh'
  },
  mainContainer: {
    backgroundColor: theme.palette.primary.main,
    minHeight: '100vh',
    marginTop: 80,
    [theme.breakpoints.up('sm')]: {
      marginTop: 120
    }
    
  }
}));

/**
 * @desc a HOC to SelectedProduct, Home
 * @param props
 * @return Navigation Component 
 */
const Navigation = () => {
  const classes = useStyles();
  let {url} = useRouteMatch();

  return (
    <React.Fragment className={classes.appContainer}>
      <NavBar buttonValue={'How to Play'}/>
      <Container className={classes.mainContainer}>               
        <Switch>  
          <Route exact path="/">            
            <Home />
          </Route> 
          <Route exact path="/ProductSelection">            
            <ProductSelection />
          </Route>        
          <Route path="/USO">
            <SelectedProduct 
              contractData={ContractData.uso}
              productName={'United States Oil Fund, LP (USO)'}          
            />
          </Route>
          <Route path="/SPY">
            <SelectedProduct 
              contractData={ContractData.spy}
              productName={'SPDR® S&P 500® ETF Trust SPY'}               
            />
          </Route>
          <Route path="/ETH">
            <SelectedProduct 
              contractData={ContractData.eth}
              productName={'Ethereum'}              
            />
          </Route>
          <Route path="/GLD">
            <SelectedProduct 
              contractData={ContractData.gld}
              productName={'SPDR® Gold Shares (GLD)'}           
            />
          </Route>
        </Switch>
      </Container>
      <Footer/>        
    </React.Fragment>
  );
};

export default Navigation;