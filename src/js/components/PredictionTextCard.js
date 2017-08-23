import React, { Component } from 'react';
import Links from '../shared/Links';

class PredictionTextCard extends Component {
  getDescription () {
    const { prediction } = this.props;

    if (prediction.description != null) {
      return prediction.description;
    }
    return '';
  }


  getStatus () {
    const { prediction } = this.props;

    if (prediction.status === 0) {
      return "?";
    } else if (prediction.status === 1) {
      if (prediction.vote_value >= 0.5) {
        return "Right";
      } else {
        return "Wrong";
      }
    }
  }


  getVoteInfo () {
    const { prediction } = this.props;
    return prediction.votes_count + " votes";
  }


  getCommentInfo () {
    const { prediction } = this.props;
    return prediction.comments_count + " comments";
  }


  predictionDate () {
    const { prediction } = this.props;
    return prediction.created_at;
  }
  

  render () {
    const { prediction } = this.props;
    return <div className="prediction-text-card">
      <div
        className="prediction-text-card__title"
        onClick={Links.prediction.bind(this, prediction.alias)}
        >
        {prediction.title}
      </div>
      <div className="prediction-text-card__comments">
        {prediction.comments_count}
        <span className="fa fa-comment"></span>
      </div>
    </div>;
  }
}

export default PredictionTextCard;
