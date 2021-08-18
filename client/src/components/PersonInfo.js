import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ChatIcon from '@material-ui/icons/Chat';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 275,
  },
  media: {
    backgroundColor:"tomato",
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    backgroundColor: red[500],
    margin:"0 auto",
    marginTop:"-50px",
  },
  offline:{
    opacity:"80%",
  }
}));

export default function PersonInfo({details}) {
  const classes = useStyles();

  return (
    <Card className={classes.root , (details.onlineStatus==='offline')?classes.offline:''}>
      <CardMedia
        className={classes.media}
       
      />
      <Avatar aria-label="recipe"  src={`images/${details.gender}.png`} className={classes.avatar}>
            
      </Avatar>
      <CardContent>
        <Typography component="h3" >{details.name}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {details.about} 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          
        {(details.onlineStatus==='online')?(
           <><NavLink to={`/chat/${details.username}` }><ChatIcon /> </NavLink></>
           ):(<><ChatIcon /></>)
          }
        
        </IconButton>
       
        {details.onlineStatus}
      </CardActions>
    </Card>
  );
}
