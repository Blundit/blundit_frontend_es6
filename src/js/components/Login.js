import React, { Component } from 'react';
import Sessions from '../shared/Sessions';

import { 
  TextField,
  RaisedButton,
  RefreshIndicator
} from 'material-ui';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
      loginError: null,
      loginLoading: false
    };
  }


  goToRegister () {
    this.props.changeView('register');
  }


  goToForgotPassword () {
    this.props.changeView('forgot');
  }


  handleEmailChange = (event) => {
    return this.setState({ email: event.target.value });
  }


  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }


  validateInputs () {
    let errors = [];
    if (this.state.email.length < 6 || this.state.email.indexOf("@", 0) === -1 || this.state.email.indexOf(".", 0) === -1) {
      errors.push({
        id: "email",
        text: "Valid Email Required"
      });
    }
    if (this.state.password === '') {
      errors.push({
        id: "password",
        text: "Password Required"
      });
    }
    this.setState({ errors: errors });

    if (errors.length === 0) {
      return true;
    }
    return false;
  }


  processLogin () {
    if (this.validateInputs()) {
      this.setState({
        errors: [],
        loginError: false,
        loginLoading: true
      });
      let params = {
        path: "login",
        data: {
          email: this.state.email,
          password: this.state.password
        },
        success: this.loginSuccess,
        error: this.loginError
      };
      API.c(params);
    }
  }


  loginSuccess = (data, request) => {
    this.setState({ loginLoading: false });
    Sessions.setUser(data.data, request);
    UserStore.getUserAvatar();
    this.props.hideLogin();
  }


  loginError = (error) => {
    this.setState({ loginLoading: false });
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ loginError: error.responseJSON.errors[0] });
    }
  }


  getErrorText (key) {
    const { errors } = this.state;
    for (let i = 0; i < state.length; i++) {
      let error = errors[i];
      if (error.id === key) {
        return error.text;
      }
    }
    return null;
  }


  render () {
    let refreshStyle = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none',
    }

    [login_button, login_error] = null;

    if (this.state.loginLoading == true) {
      login_button = <RefreshIndicator style={refreshStyle} size={50} left={0} top={0} status="loading" />;
    } else {
      login_button = <RaisedButton
        label="Login"
        primary={true}
        onClick={this.processLogin}
        style={{ width: "100%" }}
        />;
    }

    if (this.state.loginError) {
      login_error = <div className="modal__error">
        {this.state.loginError}
      </div>;
    }

    return  <div>
      <div>
        <div>
          <TextField
            id="login-email"
            floatingLabelText="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            fullWidth={true} errorText={this.getErrorText("email")}
            />
         <div>
          <TextField
            id="login-password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            fullWidth={true}
            errorText={this.getErrorText("password")}
            />
          </div>
        </div>
        <div className="modal__button">
          {login_button}
        </div>
        {login_error}

      </div>
      <div className="modal__login-footer">
        <a
          className="modal__login-link"
          onClick={this.goToRegister}
          >
          Click here to register
        </a>
        <a
          className="modal__login-link"
          onClick={this.goToForgotPassword}
          >
          Forgot your password?
        </a>
      </div>
    </div>
  }
}

export default Login;