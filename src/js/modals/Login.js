{ div, span } = React.DOM

Login = require("components/Login")
Register = require("components/Register")
ForgotPassword = require("components/ForgotPassword")
RegistrationSuccessful = require("components/RegistrationSuccessful")

module.exports = React.createFactory React.createClass
  getInitialState: ->
    view: "login"


  changeView: (view) ->
    @setState view: view
let ForgotPassword, Login, Register, RegistrationSuccessful, div, ref, span;

ref = React.DOM, div = ref.div, span = ref.span;

Login = require("components/Login");

Register = require("components/Register");

ForgotPassword = require("components/ForgotPassword");

RegistrationSuccessful = require("components/RegistrationSuccessful");

module.exports = React.createFactory(React.createClass({
  getInitialState () {
    return {
      view: "login"
    };
  },
  changeView (view) {
    return this.setState({
      view: view
    });
  },
  render () {
    return div({
      className: "modal"
    }, div({
      className: "modal__bg"
    }, ''), div({
      className: "modal__login"
    }, div({
      className: "modal__login-header"
    }, div({
      className: "modal__login-header-title"
    }, this.state.view), div({
      className: "modal__login-header-close"
    }, span({
      className: "fa fa-close",
      onClick: this.props.hideLogin
    }, ''))), div({
      className: "modal__login-body"
    }, this.state.view === "login" ? Login({
      changeView: this.changeView,
      hideLogin: this.props.hideLogin
    }) : this.state.view === "register" ? Register({
      changeView: this.changeView,
      hideLogin: this.props.hideLogin
    }) : this.state.view === "forgot" ? ForgotPassword({
      changeView: this.changeView,
      hideLogin: this.props.hideLogin
    }) : this.state.view === "registered" ? RegistrationSuccessful({
      changeView: this.changeView,
      hideLogin: this.props.hideLogin
    }) : void 0)));
  }
}));

  
  render: ->
    div { className: "modal" },
      div { className: "modal__bg" }, ''
      div { className: "modal__login"},
        # TODO: Import Gameface modal hanmdling
        div { className: "modal__login-header" },
          div { className: "modal__login-header-title" },
            @state.view
          div { className: "modal__login-header-close" },
            span
              className: "fa fa-close"
              onClick: @props.hideLogin
              ''
        div { className: "modal__login-body" },
          if @state.view == "login"
            Login
              changeView: @changeView
              hideLogin: @props.hideLogin
          else if @state.view == "register"
            Register
              changeView: @changeView
              hideLogin: @props.hideLogin
          else if @state.view == "forgot"
            ForgotPassword
              changeView: @changeView
              hideLogin: @props.hideLogin
          else if @state.view == "registered"
            RegistrationSuccessful
              changeView: @changeView
              hideLogin: @props.hideLogin

      
      
