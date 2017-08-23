var Blundit, MuiThemeProvider, RouterMixin, UserStore, deepOrange500, div, getMuiTheme, muiTheme, startBlundit;

window.React = require('react');

window.ReactDOM = require('react-dom');

require('react-tap-event-plugin')();

RouterMixin = require('react-mini-router').RouterMixin;

window.navigate = require('react-mini-router').navigate;

window._ = require('lodash');

window.UserStore = UserStore = require("stores/UserStore");

window.API = require("shared/API");

window.global = require("shared/Global");

getMuiTheme = require('material-ui/styles/getMuiTheme')["default"];

deepOrange500 = require('material-ui/styles/colors').deepOrange500;

MuiThemeProvider = require('material-ui/styles/MuiThemeProvider')["default"];

window.Material = require("material-ui");

muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#4869b2",
    accent1Color: deepOrange500
  }
});

import Sessions from './shared/Sessions';

div = React.DOM.div;

Blundit = React.createFactory(React.createClass({
  mixins: [RouterMixin],
  getInitialState: function() {
    return {
      verificationComplete: false
    };
  },
  componentWillMount: function() {
    return Sessions.verifyUserToken();
  },
  componentWillUnmount: function() {},
  routes: {
    '/': 'landing',
    '/me': 'userProfile',
    '/bookmarks': 'bookmarks',
    '/users': 'users',
    '/users/:id': 'user',
    '/register': 'register',
    '/register_success': 'registerSuccessful',
    '/login': 'login',
    '/forgot_password': 'forgotPassword',
    '/predictions': 'predictions',
    '/predictions/:id': 'prediction',
    '/predictions/new': 'createPrediction',
    '/experts': 'experts',
    '/experts/:id': 'expert',
    '/experts/new': 'createExpert',
    '/claims': 'claims',
    '/claims/:id': 'claim',
    '/claims/new': 'createClaim',
    '/categories': 'categories',
    '/categories/:id': 'categoryAll',
    '/categories/:id/predictions': 'categoryPredictions',
    '/categories/:id/claims': 'categoryClaims',
    '/categories/:id/experts': 'categoryExperts',
    '/search': 'search'
  },
  landing: function() {
    return div({}, require("views/Landing")({
      path: this.state.path
    }));
  },
  users: function() {
    return div({}, require("views/Users")({
      path: this.state.path
    }));
  },
  user: function(id) {
    return div({}, require("views/User")({
      path: this.state.path,
      user_id: id
    }));
  },
  userProfile: function() {
    return div({}, require("views/User")({
      path: this.state.path,
      me: true
    }));
  },
  predictions: function() {
    return div({}, require("views/Predictions")({
      path: this.state.path
    }));
  },
  search: function() {
    return div({}, require("views/Search")({
      path: this.state.path
    }));
  },
  prediction: function(id) {
    if (id !== "new") {
      return div({}, require("views/Prediction")({
        path: this.state.path,
        id: id
      }));
    } else {
      return this.createPrediction();
    }
  },
  createPrediction: function() {
    return div({}, require("views/CreatePrediction")({
      path: this.state.path
    }));
  },
  claims: function() {
    return div({}, require("views/Claims")({
      path: this.state.path
    }));
  },
  claim: function(id) {
    if (id !== "new") {
      return div({}, require("views/Claim")({
        path: this.state.path,
        id: id
      }));
    } else {
      return this.createClaim();
    }
  },
  createClaim: function() {
    return div({}, require("views/CreateClaim")({
      path: this.state.path
    }));
  },
  experts: function() {
    return div({}, require("views/Experts")({
      path: this.state.path
    }));
  },
  expert: function(id) {
    if (id !== "new") {
      return div({}, require("views/Expert")({
        path: this.state.path,
        id: id
      }));
    } else {
      return this.createExpert();
    }
  },
  createExpert: function() {
    return div({}, require("views/CreateExpert")({
      path: this.state.path
    }));
  },
  bookmarks: function() {
    return div({}, require("views/Bookmarks")({
      path: this.state.path
    }));
  },
  categories: function() {
    return div({}, require("views/Categories")({
      path: this.state.path
    }));
  },
  categoryAll: function(id) {
    return div({}, require("views/CategoryAll")({
      path: this.state.path,
      id: id
    }));
  },
  categoryPredictions: function(id) {
    return div({}, require("views/CategoryPredictions")({
      path: this.state.path,
      id: id
    }));
  },
  categoryExperts: function(id) {
    return div({}, require("views/CategoryExperts")({
      path: this.state.path,
      id: id
    }));
  },
  categoryClaims: function(id) {
    return div({}, require("views/CategoryClaims")({
      path: this.state.path,
      id: id
    }));
  },
  notFound: function(path) {
    return div({}, require("views/404")({}));
  },
  render: function() {
    return div({}, this.renderCurrentRoute());
  }
}));

startBlundit = function() {
  if (document.getElementById('app') != null) {
    return ReactDOM.render(React.createElement(MuiThemeProvider, {
      muiTheme: muiTheme
    }, Blundit({
      history: true
    })), document.getElementById('app'));
  }
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', startBlundit);
} else {
  window.attachEvent('onload', startBlundit);
}
