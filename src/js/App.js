import React, { Component } from 'react';
import '../App.css';

import { Route, Switch } from 'react-router-dom';

import Bookmarks from './views/Bookmarks';
import CreatePrediction from './views/CreatePrediction';
import Experts from './views/Experts';
import Expert from './views/Expert';
import CreateExpert from './views/CreateExpert';
import Claims from './views/Claims';
import Claim from './views/Claim';
import CreateClaim from './views/CreateClaim';
import Categories from './views/Categories';
import CategoryAll from './views/CaregoryAll';
import CategoryClaims from './views/CategoryClaims';
import CategoryPredictions from './views/CategoryPredictions';
import CategoryExperts from './views/CategoryExperts';
import Landing from './views/Landing';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Predictions from './views/Predictions';
import Prediction from './views/Prediction';
import Register from './views/Register';
import Search from './views/Search';
import User from './views/User';
import Users from './views/Users';


class App extends Component {
  render() {
    return <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/me" component={User} />
      <Route path="/bookmarks" component={Bookmarks} />
      <Route path="/categories" component={Categories} />
      <Route path="/categories/:id" component={CategoryAll} />
      <Route path="/categories/:id/claims" component={CategoryClaims} />
      <Route path="/categories/:id/experts" component={CategoryExperts} />
      <Route path="/categories/:id/predictions" component={CategoryPredictions} />
      <Route path="/claims" component={Claims} />
      <Route path="/claims/new" exact component={CreateClaim} />
      <Route path="/claims/:id" component={Claim} />
      <Route path="/experts" component={Experts} />
      <Route path="/experts/new" exact component={CreateExpert} />
      <Route path="/experts/:id" component={Expert} />
      <Route path="/login" component={Login} />
      <Route path="/predictions" component={Predictions} />
      <Route path="/predictions/new" exact component={CreatePrediction} />
      <Route path="/predictions/:id" component={Prediction} />
      <Route path="/register" component={Register} />
      <Route path="/search" component={Search} />
      <Route path="/users" component={Users} />
      <Route path="/users/:id" component={User} />
    </Switch>;
  }
}

export default App;
