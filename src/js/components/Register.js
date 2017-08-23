import React, { Component } from 'react';
import {
  TextField,
  RefreshIndicator,
  RaisedButton
} from 'material-ui';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      errors: [],
      registerError: null,
      registerLoading: false
    };
  }


  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }


  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }


  handlePasswordConfirmationChange = (event) => {
    this.setState({ password_confirmation: event.target.value });
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
    if (this.state.password_confirmation === '') {
       errors.push({
        id: "password_confirmation",
        text: "Password Required"
      });
    }
    if (this.state.password !== '' && this.state.password_confirmation !== '' && this.state.password !== this.state.password_confirmation) {
       errors.push({
        id: "password",
        text: "Password and Password Confirmation must match."
      });
       errors.push({
        id: "password_confirmation",
        text: "Password and Password Confirmation must match."
      });
    }

    this.setState({ errors:  errors });

    if ( errors.length === 0) {
      return true;
    }
    return false;
  }


  processRegister () {
    if (this.validateInputs()) {
      this.setState({
        registerError: false,
        errors: [],
        registerLoading: true
      });

      let params = {
        path: "register",
        data: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        },
        success: this.registerSuccess,
        error: this.registerError
      };
      API.c(params)
    }
  }


  registerSuccess = (data, request) => {
    this.setState({ registerLoading: false });
    this.props.changeView('registered');
  }


  registerError = (error) => {
    this.setState({ registerLoading: false });
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ registerError: error.responseJSON.errors[0] });
    }
  }

  
  getErrorText (key) {
    const { errors } = this.state;
    for (let i = 0; i < errors.length; i++) {
      let error = errors[i];
      if (error.id === key) {
        return error.text;
      }
    }
    return null;
  }


  showLogin () {
    this.props.changeView('login');
  }


  render () {
    let error = null;
    let register_button = <RaisedButton 
      label="Register"
      primary={true}
      onClick={this.processRegister}
      style={{ width: "100%" }}
      />;
    
    let register_style = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    }

    if (this.state.registerLoading == true) {
      register_button = <RefreshIndicator 
        style={register_style}
        size={50}
        left={0}
        top={0}
        status="loading"
        />
    }

    if (this.state.registerError) {
      error = <div className="modal__error">
        {this.state.registerError}
      </div>
    }
          
    return <div>
      <div>
        <div>
          <TextField
            id="register-email"
            floatingLabelText="Email"
            fullWidth={true}
            value={this.state.email}
            onChange={this.handleEmailChange}
            errorText={this.getErrorText("email")}
            />
        </div>
        <div>
          <TextField
            id="register-password"
            floatingLabelText="Password"
            fullWidth={true}
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            errorText={this.getErrorText("password")}
            />
        </div>
        <div>
          <TextField
            id="register-password-confirmation"
            floatingLabelText="Confirm"
            fullWidth={true}
            type="password"
            value={this.state.password_confirmation}
            onChange={this.handlePasswordConfirmationChange}
            errorText={this.getErrorText("password_confirmation")}
            />
        </div>
        <div className="modal__button">
          {register_button}
        </div>
        {error}
      </div>
      <div className="modal__login-footer">
        Have an account?
        <a
          className="modal__login-link--no-block"
          onClick={this.showLogin}
          >
          Click here to login
        </a>
      </div>
    </div>
  }
}

export default Register;