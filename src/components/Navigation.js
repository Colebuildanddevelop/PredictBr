import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
// DATA
import { ContractData } from '../ContractData';
// COMPONENTS
import ProductSelection from './ProductSelection';
import SelectedProduct from './containers/SelectedProduct';
// MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const Navigation = () => {
  
  return (
    <React.Fragment>
      <Container style={{height: '100vh'}}>
        <Switch>  
          <Route exact path="/">
            <ProductSelection />
          </Route>        
          <Route path="/USO">
            <SelectedProduct 
              factoryAddress={ContractData.uso.factoryAddress}
              factoryAbi={ContractData.uso.factoryAbi}
              gameAbi={ContractData.uso.gameAbi}
              graphUrl={ContractData.uso.apiUrl}
              timeSeriesKey='Time Series (Daily)'
              OHLCKeys={ContractData.uso.OHLCKeys}
            />
          </Route>
          <Route path="/SPY">
            <SelectedProduct 
              factoryAddress={ContractData.spy.factoryAddress}
              factoryAbi={ContractData.spy.factoryAbi}
              gameAbi={ContractData.spy.gameAbi}
              graphUrl={ContractData.spy.apiUrl}
              timeSeriesKey='Time Series (Daily)'
              OHLCKeys={ContractData.spy.OHLCKeys}
            />
          </Route>
          <Route path="/ETH">
            <SelectedProduct 
              factoryAddress={ContractData.eth.factoryAddress}
              factoryAbi={ContractData.eth.factoryAbi}
              gameAbi={ContractData.eth.gameAbi}
              graphUrl={ContractData.eth.apiUrl}
              timeSeriesKey='Time Series (Digital Currency Daily)'
              OHLCKeys={ContractData.eth.OHLCKeys}
            />
          </Route>
          <Route path="/GLD">
            <SelectedProduct 
              factoryAddress={ContractData.gld.factoryAddress}
              factoryAbi={ContractData.gld.factoryAbi}
              gameAbi={ContractData.gld.gameAbi}
              graphUrl={ContractData.gld.apiUrl}
              timeSeriesKey='Time Series (Daily)'
              OHLCKeys={ContractData.gld.OHLCKeys}
            />
          </Route>
        </Switch>
      </Container>
    </React.Fragment>
  );
};

export default Navigation;