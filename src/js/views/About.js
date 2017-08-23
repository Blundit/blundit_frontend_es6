import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    <div>
      <Header />
      <div className="about-wrapper">
        <div className="about-content">
          <div className="default__card">
            <div className="text__title expert__name">
              About
            </div>
            <div className="text__normal">
              Blundit is an expert tracker. It is THE expert tracker. It's semi-usable right now but still in development, and while this about page is skeletal now, all sorts of good stuff about the site will go here.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default About;