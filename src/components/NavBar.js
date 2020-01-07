import React from 'react';
import logo from '../logo.png';
// MATERIAL-UI
import AppBar from '@material-ui/core/AppBar';
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
  navBar: {
    backgroundColor: 'white',
    color: '#179c26'    
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

const NavBar = () => {
  const classes = useStyles();
  return (
    <React.Fragment >
      <HideOnScroll>
        <AppBar display="flex" elevation={1} className={classes.navBar}>
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