import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class User extends Component {

  render () {
    return <div>
      <Header></Header>
      <div className="user-wrapper">
        <div className="user-contnent">
          Users
        </div>
      </div>
      <Footer></Footer>
    </div>;
  }
}

export default User;
