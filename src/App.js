import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavbarComp from './components/NavbarComp';
import Home from './screen/Home';
import SignIn from './screen/Signin';
import SignUp from './screen/SignUp';

import axios from 'axios'
import jwt from 'jwt-decode'
import store from './store'
import ToastMsg from './components/ToastMsg'



import ProtectedRoute from './components/ProtectedRoute'




let token = localStorage.getItem('auth_token1')
//axios.defaults.baseURL = 'https://fb-clone-api.herokuapp.com'
axios.defaults.baseURL = 'http://localhost:5000'


if(token){
  
  let decoded = jwt(token)
  console.log(decoded);
  axios.defaults.headers.common['Authorization'] = token;
  store.dispatch({
    type: "SET_USER",
    payload: decoded
  })


 axios.get('/user/profile')
 .then(res=>{
    store.dispatch({
      type: 'SET_PROFILE',
      payload:res.data.user

    })
 })
  
}



function App() {
  return (
    <>
    <ToastMsg />
    <NavbarComp />
    <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn}  />
          <Route path="/signup" component={SignUp}  />
          

      </Switch>
      </>
  );
}

export default App;
