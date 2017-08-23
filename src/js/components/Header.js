import React, { Component } from 'react';
import Sessions from '../shared/Sessions';
import Links from '../shared/Links';
import Avatar from '../shared/Avatar';

import LoginModal from "../modals/LoginModal";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      showLoginModal: this.getShowLoginModal(),
      mobileMenu: false
    };    
  }

  getShowLoginModal () {
    if (Sessions.getURLParameter("show_login") && Number(Sessions.getURLParameter("show_login")) === 1) {
      return true;
    }
    return false;
  }


  handleUserChange (data) {
    this.setState({ user: UserStore.get() });
  }


  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
  }


  componentWillUnmount () {
    UserStore.unsubscribe(this.handleUserChange);
  }


  navigateToLocation (path) {
    this.setState({ mobileMenu: false });
    scroll(0, 0);
    // TODO: implement navigate alternative, I believe.
    navigate(path);
  }


  showLogin () {
    this.setState({ showLoginModal: true });
  }


  hideLogin () {
    this.setState({ showLoginModal: false });
  }

  getHeaderItemClass (item) {
    let c = "header__item";
    let host = window.location.pathname;
    if (host.indexOf(c, 0) > -1) {
      c += "--active";
    }

    return c;
  }


  getHeaderItemsClass () {
    return "header__items";
  }


  getHeaderUserClass () {
    return "header__user";
  }


  getHamburgerIcon () {
    if (this.state.mobileMenu === true) {
      return <span className="fa fa-close"></span>;
    } else {
      return <span className="fa fa-align-justify"></span>;
    }
  }


  toggleMobileMenu = () => {
    this.setState({ mobileMenu: !this.state.mobileMenu });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  render () {
    const { user } = this.state;
    [ login_modal, mobile_menu ] = null;

    menuItems = menuItems.filter(function(obj) {
      if ((obj.logged && this.state.user && this.state.user.token) || (!obj.logged)) {
        return true;
      }
      return false;
    });

    let user_avatar = <div>
      <div
        className="header__login"
        onClick={this.showLogin}
        >
        <span className="fa fa-sign-in"></span>
      </div>
    </div>;

    if (user && user.token) {
      user_avatar = <div
        className="header__user__avatar"
        onClick={this.navigateToLocation.bind(this, "/me")}
        style={{backgroundImage: `url(${this.getUserAvatar(user)})`}}
        />;
    }

    if (this.state.showLoginModal == true) {
      login_modal = <LoginModal hideLogin={this.hideLogin}/>;
    }

    if (this.state.mobileMenu == true) {
      mobile_menu = <div className="mobile-menu">
        <div className="header">
          <div
            className="header__logo"
            onClick={this.navigateToLocation.bind(this, "/")}
            >
            <img src="/images/logo_wordmark.png" />
          </div>
          <div
            className="header__hamburger"
            onClick={this.toggleMobileMenu}
            >
            {this.getHamburgerIcon()}
          </div>
        </div>
        <div className="mobile-menu__bg"></div>
        <div className="mobile-menu__content-wrapper">
          <div className="mobile-menu__content">
            {menuItems.reverse().map((item, index) =>
              <div
                className="mobile-menu__item"
                key="mobile-menu__item-#{index}"
                onClick={this.navigateToLocation.bind(this, item.path)}
                >
                {item.label}
              </div>
            )}
          </div>
        </div>
      </div>
    }

    return <div className="header-wrapper">
      <div className="header">
        <div
          className="header__logo"
          onClick={this.navigateToLocation.bind(this, "/")}
          >
          <img src="/images/logo_wordmark.png" />
        </div>
        <div
          className="header__hamburger"
          onClick={this.toggleMobileMenu}
          >
          {this.getHamburgerIcon()}
        </div>
        <div className={this.getHeaderItemsClass()}>
          {menuItems.map((item, index) =>
            <div
              className={this.getHeaderItemClass(item)}
              key="header-item-#{index}"
              onClick={this.navigateToLocation.bind(this, item.path)}
              >
              {item.label}
            </div>
          )}
        </div>
        <div className={this.getHeaderUserClass() }>
          {user_avatar}
        </div>
        {login_modal}
        {mobile_menu}
      </div>
    </div>
  }
}

export default Header;