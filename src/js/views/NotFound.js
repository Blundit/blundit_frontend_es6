import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class NotFound extends Component {
  render () {
    return <div>
      <Header></Header>
      <div className="not-found-wrapper">
        <div className="not-found-content">
          404
        </div>
      </div>
      <Footer></Footer>
    </div>;
  }
}

export default NotFound;
