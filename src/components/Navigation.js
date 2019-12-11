import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
// COMPONENTS
import ProductSelection from './ProductSelection';
import Gamelist from './Gamelist';

const Navigation = () => {

  return (
    <React.Fragment>

      <Switch>    
        <Route 
          exact path="/"
          render={() => <Gamelist/>}
        />
      </Switch>

    </React.Fragment>
  );

};

export default Navigation;