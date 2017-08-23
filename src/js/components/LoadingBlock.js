import React, { Component } from 'react';

import NotFound from '../shared/NotFound';
import { LinearProgress } from 'material-ui';

class LoadingBlock extends Component {
  loadingClass () {
    const { type } = this.props;
    let c = "loading";
    if (type === "short") {
      c += "--short";
    }
    return c;
  }

  render() {
    const { type, title } = this.props;

    if (!title) {
      title = "Loading";
    }

    return <div className={this.loadingClass()}>
      <div className="text__title">
        {title}
      </div>
      <NotFound>This data is currently being loaded. Please hold...</NotFound>
      <div className="loading__progress">
        <LinearProgress mode="indeterminate" />
      </div>
    </div>;
  }
}

export default LoadingBlock;
