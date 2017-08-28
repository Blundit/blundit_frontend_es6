import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Avatar from '../shared/Avatar';

import {
  TextField,
  MenuItem,
  SelectField,
  RefreshIndicator,
  RaisedButton
} from 'material-ui';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        first_name: {
          val: ''
        },
        last_name: {
          val: ''
        },
        email: {
          val: ''
        },
        notification_frequency: {
          val: ''
        }
      },
      user: null,
      errors: [],
      updateSubmitting: false,
      updateError: null,
      updateSuccess: null,
      notification_frequencies: [
        {
          id: "none",
          title: "No Notifications"
        }, {
          id: "as_they_happen",
          title: "As They Happen"
        }, {
          id: "daily",
          title: "Daily Digests"
        }, {
          id: "weekly",
          title: "Weekly Digests"
        }, {
          id: "monthly",
          title: "Monthly Digests"
        }
      ]
    }
  }


  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
  }


  componentWillUnMount () {
    UserStore.unsubscribe(this.handleUserChange);
  }


  handleUserChange () {
    let user, inputs;

    user = UserStore.get();
    this.setState({ user: this.user });

    inputs = this.state.inputs;
    inputs.first_name.val = user.first_name;
    inputs.last_name.val = user.last_name;
    inputs.email.val = user.email;
    inputs.notification_frequency.val = user.notification_frequency;

    return this.setState({ inputs: this.inputs });
  }


  submitUserUpdate () {
    let avatar, params, formData;
    const { inputs } = this.state;

    if (this.validateInputs()) {
      this.setState({
        updateSubmitting: true,
        updateSuccess: null,
        updateError: null,
      });
      formData = new FormData();
      avatar = document.getElementById('user__avatar');
      if (avatar.files[0] != null) {
        formData.append("avatar", avatar.files[0]);
      }
      formData.append("first_name", inputs.first_name.val);
      formData.append("last_name", inputs.last_name.val);
      formData.append("email", inputs.email.val);
      formData.append("notification_frequency", inputs.notification_frequency.val);
      
      params = {
        path: "update_user",
        data: this.formData,
        success: this.updateUserSuccess,
        error: this.updateUserError
      };
    
      API.c(params)
    }
  }


  validateInputs () {
    let errors = [];
    const { inputs } = this.state;

    
    if (inputs.first_name.val === '') {
      errors.push({
        id: "first_name",
        text: "First Name required."
      });
    }
    if (inputs.last_name.val === '') {
      errors.push({
        id: "last_name",
        text: "Last Name required."
      });
    }
    if (inputs.email.val.length < 6 || inputs.email.val.indexOf("@", 0) === -1 || inputs.email.val.indexOf(".", 0) === -1) {
      errors.push({
        id: "email",
        text: "Valid email required."
      });
    }

    this.setState({ errors: errors });
    if (errors.length === 0) {
      return true;
    }

    return false;
  }

  // TODO: Pull getErrorText out, add 'type' or something
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


  updateUserSuccess (data) {
    UserStore.updateUserData(data);
    this.setState({
      updateSubmitting: false,
      updateSuccess: "User Updated!"
    });
  }


  updateUserError (error) {
    this.setState({ updateSubmitting: false });
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ updateError: error.responseJSON.errors[0] });
    } else {
      this.setState({ updateError: "There was an error." });
    }
  }


  handleFirstNameChange (event) {
    this.inputs = this.state.inputs;
    this.inputs.first_name.val = event.target.value;
    this.setState({ inputs: this.inputs });
  }


  handleLastNameChange (event) {
    this.inputs = this.state.inputs;
    this.inputs.last_name.val = event.target.value;
    this.setState({ inputs: this.inputs });
  }


  handleEmailChange (event) {
    this.inputs = this.state.inputs;
    this.inputs.email.val = event.target.value;
    this.setState({ inputs: this.inputs });
  }


  handleChange (event, index, value) {
    this.inputs = this.state.inputs;
    this.inputs.notification_frequency.val = value;
    this.setState({ inputs: this.inputs });
  }


  getUserAvatarPath () {
    return (API.serverBase()) + "images/user_avatars/" + this.state.user.avatar_file_name;
  }


  render () {
    this.style = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    }

    return <div>
      <Header />
      <div className="user-wrapper">
        <div className="user-content">
          <div className="default__card">
            <div className="text__title">
              User Info
            </div>
            {(this.state.user == null || !this.state.user.token) &&
              <div className="user--not-logged-in">
                You must be logged in to view this content.
              </div>
            }
            {(this.state.user != null && this.state.user.token) &&
              <div className="user">
                If you want to update some basic info about yourself, here's the place. (Eventually, you'll be able to see stats and other cool stuff here.)
                <TextField
                  id="user-first-name"
                  hintText="First Name"
                  floatingLabelText="First Name"
                  fullWidth={true}
                  value={this.state.inputs.first_name.val}
                  onChange={this.handleFirstNameChange}
                  errorText={this.getErrorText("first_name")}
                  />
                <TextField
                  id="user-last-name"
                  hintText="Last Name"
                  floatingLabelText="Last Name"
                  fullWidth={true}
                  value={this.state.inputs.last_name.val}
                  onChange={this.handleLastNameChange}
                  errorText={this.getErrorText("last_name")}
                  />
                <TextField
                  id="user-email"
                  hintText="Email"
                  floatingLabelText="Email"
                  fullWidth={true}
                  value={this.state.inputs.email.val}
                  onChange={handleEmailChange}
                  errorText={getErrorText("email")}
                  />
                <SelectField
                  floatingLabelText="Notification Frequency"
                  value={this.state.inputs.notification_frequency.val}
                  onChange={this.handleChange}
                  >
                  {this.state.notification_frequencies.map((item, index) =>
                    <MenuItem
                      value={item.id}
                      primaryText={item.title}
                      key={`user-notification-frequency-${index}`}
                      />
                  )}
                </SelectField>
                <br/>
                <br/>
                <br/>
                <div>
                  Your Avatar:
                  <br/>
                  {this.state.user.avatar_file_name &&
                    <div className="user__avatar--current">
                      <img src={this.getUserAvatar(this.state.user) } />
                    </div>
                  }
                  <input
                    className="user__avatar"
                    type="file"
                    id="user__avatar"
                    accept=".png,.jpeg,.jpg,.gif"
                    />
                </div>
                <div>
                  {this.state.updateSubmitting == true &&
                    <RefreshIndicator
                      style={style}
                      size={50}
                      left={0}
                      top={0}
                      status="loading"
                      />
                  }
                  {this.state.updateSubmitting != true &&
                    <RaisedButton
                      label="Update User"
                      primary={true}
                      onClick={this.submitUserUpdate}
                      />
                  }
                </div>
                {this.state.updateError &&
                  <div>
                    {this.state.updateError}
                  </div>
                }
                {this.state.updateSuccess &&
                  <div>
                    {this.state.updateSuccess}
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default User;