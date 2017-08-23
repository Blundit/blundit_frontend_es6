import React, { Component } from 'react';

class NotFound extends Component {
  render () {
    return <div className="not-found">
      {this.props.children}
    </div>;
  }
}

export default NotFound;