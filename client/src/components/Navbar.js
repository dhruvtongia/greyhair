import React from 'react';
import { NavLink ,useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { baseUrl } from '../baseUrl';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  styledButton:{
      color:"white",
      textDecoration:"none",
      
  }
}));

export default function Navbar({userLoggedIn,setuserLoggedIn}) {
  const classes = useStyles();
  const history=useHistory();

   const logout=()=>{

        fetch(baseUrl+'/logout',{

            method:'post',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
      
            setuserLoggedIn(null);
            history.push('/');

        })
   }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            The Grey Hair
          </Typography>
          <NavLink to="/" className={classes.styledButton}><Button className={classes.styledButton}>Home</Button></NavLink>
          {
            (!userLoggedIn)?(
            <>
              <NavLink to="/register" className={classes.styledButton}><Button className={classes.styledButton}>Register</Button></NavLink>
            <NavLink to="/login" className={classes.styledButton}><Button className={classes.styledButton}>Login</Button></NavLink>
            </>):(
                (userLoggedIn.role==='mentor')?(
                <>
                <NavLink to={`/chat/${userLoggedIn.username}`} className={classes.styledButton}><Button className={classes.styledButton}>Chat</Button></NavLink>
                <Button onClick={logout} className={classes.styledButton}>Logout</Button>
                </>):
                (
                <>
                <NavLink to="/list" className={classes.styledButton}><Button className={classes.styledButton}>Mentors</Button></NavLink>
                <Button onClick={logout} className={classes.styledButton}>Logout</Button>
                </>)
            )
          }
    
        </Toolbar>
      </AppBar>
    </div>
  );
}