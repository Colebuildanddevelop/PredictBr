import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './containers/Navigation';
// MATERIAL UI 
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

// main application component 
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation/>
      </Router>
    </ThemeProvider>
  );
}

export default App;

