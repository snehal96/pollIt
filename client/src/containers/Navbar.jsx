import React from "react";
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from "../store/action";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import HomeIcon from '@material-ui/icons/Home';
import PollIcon from '@material-ui/icons/Poll';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0.03,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  linkright: {
      flex: '0.03 1 auto',
      color: 'white',
      textDecoration: 'none',
      fontWeight: 350
  },
  linkleft: {
        color: 'black',
        textDecoration: 'none',
        fontWeight: 500,
        marginLeft: '10%'
    },
  welcome: {
      height: '25px',
      width: '100%',
      textAlign: "center",
      backgroundColor: "lightskyblue",
      marginTop: 'auto'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}));

const Navbar = ({ auth, logout }) => {
    
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:450px)');

    const [state, setState] = React.useState({
        left: false
      });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <ListItemText>
                <Typography variant="h6" >
                    <HomeIcon />
                    <Link to="/" className={classes.linkleft}>Home</Link>
                </Typography>
            </ListItemText>

            {  auth.isAuthenticated &&
            <ListItemText>
                <Typography variant="h6" >
                    <PollIcon />
                    <Link to="/poll/new" className={classes.linkleft}>New Poll</Link>
                </Typography>
            </ListItemText>
            }

            {  !auth.isAuthenticated &&
            <ListItemText>
                <Typography variant="h6" >
                    <PersonAddIcon />
                    <Link to="/register" className={classes.linkleft}>Register</Link>
                </Typography>
            </ListItemText>
            }  

            {  !auth.isAuthenticated &&
            <ListItemText>
                <Typography variant="h6" >
                    <InputIcon />
                    <Link to="/login" className={classes.linkleft}>Login</Link>
                </Typography>
            </ListItemText>}

            {  auth.isAuthenticated && 
            <ListItemText>
                <Typography variant="h6" >
                    <InputIcon />
                    <Link to="/" onClick={logout} className={classes.linkleft}>Logout</Link>
                </Typography>
            </ListItemText>
            }
        </div>
  );

    const anchor = 'left';

    return (
        <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            {!matches && 
                <div>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon />
                    </IconButton>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </div>
            }

            <Typography color="inherit" variant="h6" className={classes.title}>
                PollIt!
            </Typography>
            
            { matches && 
                <ListItemText className={classes.linkright}>
                    <Typography variant="h6" >
                        <Link to="/" className={classes.linkright}>Home</Link>
                    </Typography>
                </ListItemText>
            }

            { matches && auth.isAuthenticated &&
            <ListItemText className={classes.linkright}>
                <Typography variant="h6" >
                    <Link to="/poll/new" className={classes.linkright}>{(<p>New Poll</p>)}</Link>
                </Typography>
            </ListItemText>
            }

            { matches && !auth.isAuthenticated &&
            <ListItemText className={classes.linkright}>
                <Typography variant="h6" >
                    <Link to="/register" className={classes.linkright}>{(<p>Register</p>)}</Link>
                </Typography>
            </ListItemText>
            }  
            
            { matches && !auth.isAuthenticated &&
            <ListItemText className={classes.linkright}>
                <Typography variant="h6" >
                    <Link to="/login" className={classes.linkright}>{(<p>Login</p>)}</Link>
                </Typography>
            </ListItemText>}

            { matches && auth.isAuthenticated && 
            <ListItemText className={classes.linkright}>
                <Typography variant="h6" >
                    <Link to="/" onClick={logout} className={classes.linkright}>{(<p>Logout</p>)}</Link>
                </Typography>
            </ListItemText>
            }
          </Toolbar>
        </AppBar>
        { auth.isAuthenticated && <p className={classes.welcome} color="inherit">Logged in as <strong>{auth.user.username}</strong></p>}
      </div>
)}

export default connect((store)=>({auth: store.auth}), {logout})(Navbar);