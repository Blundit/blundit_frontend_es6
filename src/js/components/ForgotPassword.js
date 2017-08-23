import React, { Component } from 'react';
import {
  RaisedButton,
  TextField,
  RefreshIndicator
} from 'material-ui';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      inputs: {
        email: {
          validateEmail: true,
          value: ''
        }
      },
      errors: [],
      forgotLoading: false,
      forgotError: false,
      sentRecoveryEmail: false
    };
  }


  showLogin () {
    this.props.changeView('login');
  }


  processForgotPassword () {
    if (this.validateInputs()) {
      this.setState({ 
        errors: [],
        forgotLoading: true
      });

      let params = {
        path: "forgot_password",
        data: {
          email: this.state.inputs.email.value
        },
        success: this.forgotPasswordSuccess,
        error: this.forgotPasswordError
      };

      API.c(params);
    }
  }

  handleEmailChange = (event) => {
    this.inputs = this.state.inputs;
    this.inputs.email.value = event.target.value;
    this.setState({ inputs: this.inputs });
  }


  validateInputs () {
    let errors = [];
    if (this.state.inputs.email.value.length < 6 || this.state.inputs.email.value.indexOf("@", 0) === -1 || this.state.inputs.email.value.indexOf(".", 0) === -1) {
      errors.push({
        id: "email",
        text: "Valid Email Required"
      });
    }
    this.setState({ errors: errors });
    if (errors.length === 0) { return true; }

    return false;
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


  forgotPasswordSuccess = (data) => {
    this.setState({
      sentRecoveryEmail: true,
      forgotLoading: false
    });
  }


  forgotPasswordError = (error) => {
    this.setState({ forgotLoading: false });
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ forgotError: error.responseJSON.errors[0] });
    }
  }


  render () {
    [ sentRecoveryEmail, forgotError ] = null;

    if (this.state.sentRecoveryEmail == true) {
      sentRecoveryEmail = <div>An email with a link to reset your password has been sent to you.</div>
    }

    if (this.state.forgotError) {
      forgotError = <div className="modal__error">{this.state.forgotError}</div>;
    }

    let refreshStyle = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    }

    login_loading = <RaisedButton 
      label="Reset Password"
      primary={true}
      onClick={this.processForgotPassword}
      style={{ width: "100%" }}
      />;

    if (this.state.loginLoading == true) {
      login_loading = <RefreshIndicator style={refreshStyle} size={50} left={0} top={0} status="loading" />;
    }

    return <div>
      {sentRecoveryEmail}
      <div>
        <div>
          <TextField 
            id="forgot-email"
            floatingLabelText="Email"
            value={this.state.inputs.email.value}
            fullWidth={true}
            onChange={this.handleEmailChange}
            errorText={this.getErrorText("email")}
            />
        </div>
        <div className="modal__button">
          {login_loading}
        </div>
        {forgotError}
        <div className="modal__login-footer">
          Remembered your password?
          <a
            className="modal__login-link--no-block"
            onClick={this.showLogin}
            >
            Click here to login
          </a>
        </div>
      </div>
    </div>
  }
}

export default ForgotPassword;


