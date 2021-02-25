import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Register from './pages/register'; 
import Painel from './pages/painel'; 
import User from './pages/users'; 
import Counts from './pages/counts'; 
import TypesCounts from './pages/types-counts'; 
import PDF from './pages/pdf'; 

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component= { App } />
      <Route path="/register" component={ Register } />
      <Route path="/painel" component={ Painel } />
      <Route path="/users" component={ User } />
      <Route path="/counts" component={ Counts } />
      <Route path="/type-count" component={ TypesCounts } />
      <Route path="/pdf" component={ PDF } />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
);
