import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../redux/createStore';
import Navigation from './Navigation';
// MATERIAL-UI
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <Container>
      <Provider store={store}>       
        <Router>
          <Navigation/>
        </Router>
      </Provider>  
    </Container>
  );
}

export default App;