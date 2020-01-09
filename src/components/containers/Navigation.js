import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
// ROUTER
import { useRouteMatch } from 'react-router-dom';
// DATA
import { ContractData } from '../../ContractData';
// COMPONENTS
import ProductSelection from '../ProductSelection';
import SelectedProduct from './SelectedProduct';
import NavBar from '../NavBar';
import Footer from '../Footer';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: theme.palette.primary,
    marginTop: 10
  }
}));

const Navigation = (props) => {
  const classes = useStyles();
  let {url} = useRouteMatch();

  return (
    <React.Fragment>
     
      <NavBar buttonValue={'How to Play'}/>
   
      <Container style={{height: '100vh'}} className={classes.mainContainer}>        

        <Switch>  
          <Route exact path="/">            
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
              productName={'SPDR Gold Shares (GLD)'}           
            />
          </Route>
        </Switch>
        <Footer/>        
      </Container>
    </React.Fragment>
  );
};

export default Navigation;