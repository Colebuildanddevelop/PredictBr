import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../redux/createStore';
import Navigation from './containers/Navigation';

// MATERIAL UI 
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import white from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: white,
    secondary: grey
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

