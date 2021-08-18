import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import "./Chat.css"
import  io  from "socket.io-client";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    minWidth: "85%"
  },
}));


const ENDPOINT='http://localhost:8080/';

//const socket=io(ENDPOINT,{transports:['websocket']});

const Chat = () => {
    const classes=useStyles();
    const username=useParams().username;
   // console.log(username);
    const [socket, setsocket] = useState();
    const [message, setmessage] = useState("");

    useEffect(() => {

        setsocket(io(ENDPOINT));
        
        //socket.emit('join','neewroom');
       
      }, [])

    const createMessage=(msg,position)=>{
        const area=document.getElementById('message__area');
        const newmsg=document.createElement('div');
        newmsg.classList.add(position);
        newmsg.classList.add('message');
        newmsg.innerText=msg;
       // console.log(newmsg);
       // console.log(area);
       if(area)
        area.appendChild(newmsg);
    }
    const sendMsg=()=>{

        const msg=message;
        //console.log(msg);
        
        createMessage(`You: ${msg}`,'right');
        socket.emit('message',msg,username);
        setmessage("");
        
    }
    useEffect(() => {

        socket?.emit('addToRoom',username);
    
        socket?.on('sent',(msg)=>{
         createMessage(`They: ${msg}`,'left');
           
        })
        
      }, [socket])
    return (
        <Container maxWidth="sm">
            <section className="chat__section">
            <div className="brand">
                <h1>{username} Chat Space</h1>
            </div>
            <div id="message__area"></div>
            <div className="inputArea">
            <TextField className={classes.root}
            id="outlined-textarea"  placeholder="Enter Your message" multiline
            value={message} onChange={(e)=>setmessage(e.target.value)} variant="outlined"
            />
                <Button
                    onClick={sendMsg}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon/>}
                >
                    Send
                </Button>
            </div>
        </section>
    </Container>
    )
}

export default Chat
