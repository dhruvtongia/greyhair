import React,{useState,useEffect} from 'react';
import { Route,Switch }  from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'
import Index from './components/Index'
import Navbar from './components/Navbar'
import Chat from './components/Chat/Chat'
import MentorsList from './components/MentorsList';
import  Notfound  from './components/Notfound';
import Footer from './components/Footer'
import { baseUrl } from './baseUrl';
function App() {

  const [userLoggedIn, setuserLoggedIn] = useState(null);
  

  useEffect(() => {
    fetch(baseUrl+'/',{
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        credentials:'include' // bahut important cookies ko bhejne ke liye taki har request pe nayi cooki na ban jaaye
      })
       .then(response => response.json())
       .then((result)=>{
         if(result.user)
         {
           setuserLoggedIn(result.user);
         }
       }).catch(err=>{
         console.log(err);
       });
  }, [])
  return (
    <>
      <Navbar userLoggedIn={userLoggedIn} setuserLoggedIn={setuserLoggedIn}/>
      <Switch>
          <Route exact path="/">
              <Index/>
          </Route>
          <Route exact path="/login" >
                <Login setuserLoggedIn={setuserLoggedIn} />
          </Route>
          <Route exact path="/register">
              <Register/>
          </Route>
          <Route exact path="/chat/:username">
              <Chat/>
          </Route>
          <Route exact path="/list">
              <MentorsList/>
          </Route>

          <Route>
            <Notfound/>
          </Route>
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
