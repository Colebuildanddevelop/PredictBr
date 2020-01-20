import React from 'react';
import logo from '../logo.png';
import { useRouteMatch } from 'react-router-dom';
// COMPONENTS
import HowToPlayDrawer from './HowToPlayDrawer';
// MATERIAL-UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles(theme => ({
  navBarMain: {
    backgroundColor: 'white',
    color: '#179c26',    
  },
  navBarSecondary: {
    marginTop: 57,
    backgroundColor: '#5ee07d',
    color: 'black',
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bolder',
    fontSize: 20,
    padding: 12,
  },
  icon: {
    color: theme.palette.secondary,
  }
}));

const NavBar = (props) => {
  const classes = useStyles();


  return (
    <React.Fragment >
      <HideOnScroll>
        <AppBar elevation={2} className={classes.navBarMain}>
          <Toolbar >
            <NavLink style={{ textDecoration: 'none', color: 'unset' }} to="/" color="inherit">
              <img src={logo} style={{color: 'white'}}/>
            </NavLink>  
            <Typography variant="h6" align="right" className={classes.title}>              
              <NavLink style={{ textDecoration: 'none', color: 'unset' }} to="/" color="inherit">
                PREDICTBR
              </NavLink>
            </Typography>
          </Toolbar>         
        </AppBar>
      </HideOnScroll>


    </React.Fragment>
    
  )
}


export default NavBar;