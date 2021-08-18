import React, { useState,useRef } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { baseUrl } from '../baseUrl';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function Login({setuserLoggedIn}) {
  const classes = useStyles();

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const history=useHistory();
 
  const messageRef = useRef(null);

  const submitForm=async(e)=>{
    e.preventDefault();
    
    const res=await fetch(baseUrl+'login', {

      method:'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
          },
      body:JSON.stringify({
        username,
        password
      }),
     credentials:'include'

    });

   const data= await res.json();
    messageRef.current.innerHTML=data.message;

    
    
      if((res.status===200))
        {
          setuserLoggedIn(data.user);
          if(data.user.role==='mentor')
          {
            history.push(`/chat/${data.user.username}`);
          }
          else{
          history.push('/');
          }
        }
      else
      {
        setTimeout(() => {
          messageRef.current.innerHTML='';
          setusername('');
          setpassword('');
        }, 2000)
      }
     

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        < div class="mb-3" ref={messageRef} style={{color: "red"}}> </div>
        <form className={classes.form} noValidate onSubmit={submitForm}>
          <TextField
          value={username}
          onChange={(e)=>{setusername(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
          value={password}
          onChange={(e)=>{setpassword(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/register" variant="body2">
                  <Typography compoenet="h6" variant="body2">
                    Don't have an account? Sign Up
                  </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}