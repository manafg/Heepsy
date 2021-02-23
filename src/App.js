import React,  { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
    Link
  } from "react-router-dom";
  import {Home , Favriote, NoMatch, Fav}   from './Screens';
  import "./App.scss"


export default function App (){
 return (
   <div className="App">
  <Router>
    <Switch>
    <Route  path="/:id" children={<Favriote />}>
      
    </Route>
    
    <Route path="/">
      <Home />
    </Route>

    <Route path="/Fav/favriote" children={ <Fav />}>
     
    </Route>
    <Route path="*">
      <Favriote />
    </Route>
  </Switch>
  </Router>
  </div>
 )
}