import React, { Component } from 'react';
import Sessions from '../shared/Sessions';
import Links from '../shared/Links';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
  }


  componentWillUnmount () {
    UserStore.unsubscribe(this.handleUserChange);
  }


  handleUserChange = (data) => {
    this.setState({ user: UserStore.get() });
  }

  
  getFooterText () {
    // TODO Pull this from somewhere on the server.
    let host = window.location.host;
    let version = "0.2 (Pre-Alpha)";
    let environment = "This is Blundit";
    if (host.indexOf("dev.blundit.com", 0) > -1 || host.indexOf("localhost", 0) > -1) {
      environment = "This is the Blundit Development Server";
    }
    return environment + ". We're at version " + version + ".";
  }


  render () {
    [ sign_out ] = null;

    if (this.state.user && this.state.user.token) {
      sign_out = <div
        className="footer__link--signout"
        onClick={this.logout}
        >
        Sign out
      </div>;
    }

    return <div className="footer-wrapper">
      <div className="footer-content">
        <div className="footer__card">
          <div className="footer__card-row">
            <div className="footer__text">{this.getFooterText()}</div>
            <a
              className="footer__link"
              onClick={this.goToAbout}
              >
              About
            </a>
            <a
              className="footer__link"
              onClick={this.goToContact}
              >
              Contact
            </a>
            <a
              className="footer__link"
              onClick={this.goToPrivacyPolicy}
              >
              Privacy Policy
            </a>
          </div>
          <div className="footer__card-row">
            <div className="footer__icons">
              <span className="fa fa-facebook" onClick={this.goToFacebook}></span>
              <span className="fa fa-medium" onClick={this.goToMedium}></span>
              <span className="fa fa-twitter" onClick={this.goToTwitter}></span>
              <span className="fa fa-youtube" onClick={this.goToYoutube}></span>
              <span className="fa fa-trello" onClick={this.goToTrello}></span>
              <span className="fa fa-github" onClick={this.goToGithub}></span>
            </div>
           {sign_out}
          </div>
        </div>
      </div>
    </div>
  }
}

export default Footer;