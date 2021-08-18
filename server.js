const express=require('express');
const mongoose=require("mongoose");
const passport=require('passport');
const session=require("express-session");
const MongoDbStore=require('connect-mongo');
const dotenv=require('dotenv');
const cors=require('cors');
//const User=require('./models/User');
const bcrypt=require('bcrypt');
dotenv.config({path:'./config.env'});

const http=require('http');
const app=express();
const server=http.createServer(app);


//------------ connecting to the mongodb database----------// 
const url=process.env.DATABASE;
const PORT=process.env.PORT||8080;

mongoose.connect(url,{useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false ,
    useNewUrlParser:true,
    useCreateIndex:true
                        })
    .then(result=>{

        server.listen(PORT,()=> console.log('server connected'));
    })
    .catch(err=>{
        console.log(err);
    })


const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected');
}).on('error', console.error.bind(console, 'connection error:'));


//-----------middlewares--------------//
app.use(express.urlencoded({extended:true}));
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials:true,
// }));
app.use(express.json());

//session store
const mongoStore=MongoDbStore.create({
    mongoUrl:url,
    collectionName:'sessions'  // name of the collection in database
});


//session config
app.use(session({
    secret:process.env.SECRETKEY,
    proxy:true,
    resave:false,
    saveUninitialized:false,
    store: mongoStore,
    cookie:{ maxAge:1000*60*60*24}// 24 hours
    

}));

//passport config
const passportInit=require('./passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


// routes
const authRoutes=require('./routes/authRoutes');
app.use('/api',authRoutes);
app.get('/api/',(req,res)=>{

    res.status(200).json({user:req.user});
})

//socket
const io=require('socket.io')(server);
// const io=require('socket.io')(server,{
//     cors: {
//       origin: "http://localhost:3000",
//       credentials: true,
//     },
//   });

io.on('connection',(socket)=>{
    //console.log('connected...');
    
    if(socket.room)
        socket.leave(socket.room);
    socket.on('addToRoom',(roomName)=>{
        //console.log(roomName);
        if(roomName){
           // cnt++;
            //console.log("in addtoroom",cnt);
        socket.join(roomName);
        }
    })
    socket.on('message',(msg,roomName)=>{

        //console.log(msg,roomName);
        if(roomName){
          //  console.log("in message");
        socket.to(roomName).emit('sent',msg);
        }
    })

})

if(process.env.NODE_ENV==="production")
{
    
    const path=require("path");
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build'))
    });
    
}