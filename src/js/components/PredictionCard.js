import React, { Component } from 'react';

import Links from '../shared/Links';
import Dates from '../shared/Dates';
import Avatar from '../shared/Avatar';

import { 
  Card,
  CardActions
} from 'material-ui';


class PredictionCard extends Component {
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
      return "Unknown";
    } else if (prediction.status === 1) {
      if (prediction.vote_value >= 0.5) {
        return "Right";
      } else {
        return "Wrong";
      }
    }
  }


  getVoteInfo () {
    let votes;
    const { prediction } = this.props;

    if (prediction.votes_count == null) {
      votes = 0;
    } else {
      votes = prediction.votes_count;
    }

    return votes + " votes";
  }


  getCommentInfo () {
    const { prediction } = this.props;
    return prediction.comments_count + " comments";
  }


  predictionDate () {
    const { prediction } = this.props;
    return Dates.formatDate(prediction.prediction_date);
  }

  predictionPrimaryCategory = () => {
    const { prediction } = this.props;

    if (prediction.categories.length > 0) {
      return <div className="prediction-card-category">
        <span onClick={Links.goToCategory.bind(this, prediction.categories[0].id)}>
          {prediction.categories[0].name}
        </span>
      </div>
    }
  }


  predictionRecentExperts = () => {
    const { prediction } = this.props;
    if (prediction.recent_experts.length > 0) {
      return <div className="prediction-card-experts">
        {prediction.recent_experts.map((expert, index) =>
          <div
            key={`prediction-card-expert-${index}`}
            className="prediction-card-experts__expert"
            onClick={this.goToExpert.bind(this, expert.alias)}
            >
            <div
              className="prediction-card-experts__expert-avatar"
              style={{ backgroundImage: `url(${Avatar.getExpertAvatar(expert)})` }}
              />
            <div className="prediction-card-experts__expert-name">
              {expert.name}
            </div>
          </div>
        )}
      </div>
    }
  }


  render () {
    let prediction;
    const { prediction } = this.props;
    [ card_actions ] = null;

    if (prediction.status == 0 && UserStore.loggedIn()) {
      // TODO: add check here to see if user has already voted and add vote buttons
      card_actions = <div
        className="prediction-card-vote"
        onClick={Links.goToPrediction.bind(this, prediction.alias)}
        >
        VOTE
      </div>;
    } else if (prediction.status == 0 && !UserStore.loggedIn()) {
      card_actions = <div className="prediction-card-vote">
        Log in to Vote
      </div>;
    }

    return <div className="prediction-card">
      <Card >
        <div
          className="prediction-card-title"
          onClick={Links.goToPrediction.bind(this, prediction.alias)}
          >
          {prediction.title}
        </div>
        <div className="prediction-card-text">
          <div className="prediction-card-date">
            {prediction.status == 0 ? "Will happen on " : "Happened on "} 
            {this.predictionDate()}
          </div>
          <div className="prediction-card-meta">
            <div className="prediction-card-meta__status">
              {this.getStatus()}
            </div>
            <div className="prediction-card-meta__votes">
              {this.getVoteInfo()}
            </div>
            <div className="prediction-card-meta__comments">
              {this.getCommentInfo()}
            </div>
          </div>
          {this.predictionPrimaryCategory()}
          {this.predictionRecentExperts()}
        </div>
        <CardActions>
          {card_actions}
        </CardActions>
      </Card>
    </div>
  }
}

export default PredictionCard;