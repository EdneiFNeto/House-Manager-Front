import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Register from './pages/register'; 
import Painel from './pages/painel'; 
import User from './pages/users'; 
import Counts from './pages/counts'; 

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component= { App } />
      <Route path="/register" component={ Register } />
      <Route path="/painel" component={ Painel } />
      <Route path="/users" component={ User } />
      <Route path="/counts" component={ Counts } />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
);