import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
// DATA
import { ContractData } from '../ContractData';
// COMPONENTS
import ProductSelection from './ProductSelection';
import SelectedProduct from './containers/SelectedProduct';
import NavBar from './NavBar';
import Footer from './Footer';
// MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const Navigation = () => {
  
  return (
    <React.Fragment>
      
      <Container style={{height: '100vh'}}>
        <NavBar/>
        <Switch>  
          <Route exact path="/">
            <ProductSelection />
          </Route>        
          <Route path="/USO">
            <SelectedProduct 
              contractData={ContractData.uso}          
            />
          </Route>
          <Route path="/SPY">
            <SelectedProduct 
              contractData={ContractData.spy}               
            />
          </Route>
          <Route path="/ETH">
            <SelectedProduct 
              contractData={ContractData.eth}              
            />
          </Route>
          <Route path="/GLD">
            <SelectedProduct 
              contractData={ContractData.gld}           
            />
          </Route>
        </Switch>
        <Footer />
      </Container>

    </React.Fragment>
  );
};

export default Navigation;