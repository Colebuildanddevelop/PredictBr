import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../redux/createStore';
import Navigation from './containers/Navigation';
// MATERIAL UI 
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
      light: grey[50]
    },
    secondary: {
      main: green['A400'],
      light: green['A700']
    }
  },
});


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>       
        <Router>
          <Navigation/>
        </Router>
      </Provider>        
    </ThemeProvider>

  );
}

export default App;

