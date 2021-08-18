const User=require("../models/user");
const passport=require('passport');
const bcrypt=require('bcrypt');
const authController=()=>
{
    return{
        registerUser(req,res){
        
            const {name,username,password,role,about,gender}=req.body;
            // console.log(req.body);
             User.findOne({username:username})
             .then(async(result)=>{
         
                 if(result)
                 {        
                      res.status(422).json({message:"Username already registered"});
                 }
                 else
                 {
                     //hashing the password
                     const hashedPassword=await bcrypt.hash(password,10); //making its parent function async
         
                     //console.log(hashedPassword);
         
                     const user=new User({
                         name,
                         username,
                         password:hashedPassword,
                         role,about,gender
                     });
         
                     user.save()
                     .then(response=>{
         
                          res.status(201).json({message:'Successfully Registered'});
                     })
                     .catch(err=>{
                         console.log(err);
                          res.status(500).json({message:'Failed to register'});
                     });
                 }
             })
             .catch(err=>{
                 console.log(err);
                 res.status(400).json({message:"error Please try again"});
             })
         
             
        },

        loginUser(req,res,next){
           
            passport.authenticate('local',(err,user,info)=>{ //this callback function is nothing but done fun we are receiving

                if(err)
                {
                    res.status(400).json({message:info.message});
                    return next(err);
                }
        
                if(!user)
                {
                    
                    res.status(400).json({message:"Invalid Credentials"});
                }
                //now logging in the user user req.log .this is made possible bcoz of the passport
                req.logIn(user,(err)=>{
                    if(err)
                    {
                        res.status(400).json({message:"Invalid Credentials"});
                    }
                   
                    //console.log(user);
                    //console.log(req.user);
                    User.updateOne({username:req.user.username},{onlineStatus:"online"},(err,result)=>{

                        if(err)
                        {
                            res.status(400).json({message:'error'});
                        }
                        
                        res.status(200).json({message:"Successfully LoggedIn",user:req.user});
                    });
                    
                });
            })(req,res,next);
        
          
        },

        logoutUser(req,res){
            User.updateOne({username:req.user.username},{onlineStatus:"offline"},(err,result)=>{

                if(err)
                {
                    res.status(400).json({message:'error'});
                }
                
            });
            req.logout();
            res.json({user:req.user});
            
        },

        getList(req,res){
            //console.log(req,req.user);
            User.find({role:'mentor'})
            .then((result)=>{
                    //console.log(result);
                if(result)
                 {        
                      res.status(201).json({list:result});
                 }
                 else
                 {
                    res.status(500).json({message:'lo results found'});
                 }
            })
            .catch(err=>{
                console.log(err);
                res.status(400).json({message:"error Please try again"});
            })
        }
    }
}

module.exports=authController;