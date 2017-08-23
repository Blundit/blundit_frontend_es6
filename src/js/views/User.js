let Footer, Header, br, div, img, input, ref;

ref = React.DOM, div = ref.div, input = ref.input, br = ref.br, img = ref.img;

import Header from '../components/Header';

import Footer from '../components/Footer';

import Avatar from '../shared/Avatar';

module.exports = React.createFactory(React.createClass({
  getInitialState () {
    return {
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
    };
  },
  componentDidMount () {
    return UserStore.subscribe(this.handleUserChange);
  },
  componentWillUnMount () {
    return UserStore.unsubscribe(this.handleUserChange);
  },
  handleUserChange () {
    this.user = UserStore.get();
    this.setState({
      user: this.user
    });
    this.inputs = this.state.inputs;
    this.inputs.first_name.val = this.user.first_name;
    this.inputs.last_name.val = this.user.last_name;
    this.inputs.email.val = this.user.email;
    this.inputs.notification_frequency.val = this.user.notification_frequency;
    return this.setState({
      inputs: this.inputs
    });
  },
  submitUserUpdate () {
    let avatar, params;
    if (this.validateInputs()) {
      this.setState({
        updateSubmitting: true
      });
      this.setState({
        updateSuccess: null
      });
      this.setState({
        updateError: null
      });
      this.formData = new FormData();
      avatar = document.getElementById('user__avatar');
      if (avatar.files[0] != null) {
        this.formData.append("avatar", avatar.files[0]);
      }
      this.formData.append("first_name", this.state.inputs.first_name.val);
      this.formData.append("last_name", this.state.inputs.last_name.val);
      this.formData.append("email", this.state.inputs.email.val);
      this.formData.append("notification_frequency", this.state.inputs.notification_frequency.val);
      params = {
        path: "update_user",
        data: this.formData,
        success: this.updateUserSuccess,
        error: this.updateUserError
      };
      API.c(params)
    }
  },
  validateInputs () {
    this.errors = [];
    if (this.state.inputs.first_name.val === '') {
      this.errors.push({
        id: "first_name",
        text: "First Name required."
      });
    }
    if (this.state.inputs.last_name.val === '') {
      this.errors.push({
        id: "last_name",
        text: "Last Name required."
      });
    }
    if (this.state.inputs.email.val.length < 6 || this.state.inputs.email.val.indexOf("@", 0) === -1 || this.state.inputs.email.val.indexOf(".", 0) === -1) {
      this.errors.push({
        id: "email",
        text: "Valid email required."
      });
    }
    this.setState({
      errors: this.errors
    });
    if (this.errors.length === 0) {
      return true;
    }
    return false;
  },
  getErrorText (key) {
    let error, i, len, ref1;
    ref1 = this.state.errors;
    for (i = 0, len = ref1.length; i < len; i++) {
      error = ref1[i];
      if (error.id === key) {
        return error.text;
      }
    }
    return null;
  },
  updateUserSuccess (data) {
    UserStore.updateUserData(data);
    this.setState({
      updateSubmitting: false
    });
    return this.setState({
      updateSuccess: "User Updated!"
    });
  },
  updateUserError (error) {
    this.setState({
      updateSubmitting: false
    });
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      return this.setState({
        updateError: error.responseJSON.errors[0]
      });
    } else {
      return this.setState({
        updateError: "There was an error."
      });
    }
  },
  handleFirstNameChange (event) {
    this.inputs = this.state.inputs;
    this.inputs.first_name.val = event.target.value;
    return this.setState({
      inputs: this.inputs
    });
  },
  handleLastNameChange (event) {
    this.inputs = this.state.inputs;
    this.inputs.last_name.val = event.target.value;
    return this.setState({
      inputs: this.inputs
    });
  },
  handleEmailChange (event) {
    this.inputs = this.state.inputs;
    this.inputs.email.val = event.target.value;
    return this.setState({
      inputs: this.inputs
    });
  },
  handleChange (event, index, value) {
    this.inputs = this.state.inputs;
    this.inputs.notification_frequency.val = value;
    return this.setState({
      inputs: this.inputs
    });
  },
  getUserAvatarPath () {
    return (API.serverBase()) + "images/user_avatars/" + this.state.user.avatar_file_name;
  },
  render () {
    return div({}, Header({}, ''), div({
      className: "user-wrapper"
    }, div({
      className: "user-content"
    }, div({
      className: "default__card"
    }, div({
      className: "text__title"
    }, "User Info"), this.state.user === null || (this.state.user.token == null) ? div({
      className: "user--not-logged-in"
    }, "You must be logged in to view this content.") : div({
      className: "user"
    }, "If you want to update some basic info about yourself, here's the place. (Eventually, you'll be able to see stats and other cool stuff here.)", React.createElement(Material.TextField, {
      id: "user-first-name",
      hintText: "First Name",
      floatingLabelText: "First Name",
      fullWidth: true,
      value: this.state.inputs.first_name.val,
      onChange: this.handleFirstNameChange,
      errorText: this.getErrorText("first_name")
    }), React.createElement(Material.TextField, {
      id: "user-last-name",
      hintText: "Last Name",
      floatingLabelText: "Last Name",
      fullWidth: true,
      value: this.state.inputs.last_name.val,
      onChange: this.handleLastNameChange,
      errorText: this.getErrorText("last_name")
    }), React.createElement(Material.TextField, {
      id: "user-email",
      hintText: "Email",
      floatingLabelText: "Email",
      fullWidth: true,
      value: this.state.inputs.email.val,
      onChange: this.handleEmailChange,
      errorText: this.getErrorText("email")
    }), React.createElement(Material.SelectField, {
      floatingLabelText: "Notification Frequency",
      value: this.state.inputs.notification_frequency.val,
      onChange: this.handleChange
    }, this.state.notification_frequencies.map(function(item, index) {
      return React.createElement(Material.MenuItem, {
        value: item.id,
        primaryText: item.title,
        key: "user-notification-frequency-" + index
      });
    })), br({}), br({}), br({}), div({}, "Your Avatar:", br({}), this.state.user.avatar_file_name != null ? div({
      className: "user__avatar--current"
    }, img({
      src: Avatar.getUserAvatar(this.state.user)
    })) : void 0, input({
      className: "user__avatar",
      type: "file",
      id: "user__avatar",
      accept: ".png,.jpeg,.jpg,.gif"
    })), div({}, this.state.updateSubmitting === true ? (this.style = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    }, React.createElement(Material.RefreshIndicator, {
      style: this.style,
      size: 50,
      left: 0,
      top: 0,
      status: "loading"
    })) : React.createElement(Material.RaisedButton, {
      label: "Update User",
      primary: true,
      onClick: this.submitUserUpdate
    })), this.state.updateError != null ? div({}, this.state.updateError) : void 0, this.state.updateSuccess != null ? div({}, this.state.updateSuccess) : void 0)))), Footer({}, ''));
  }
}));
