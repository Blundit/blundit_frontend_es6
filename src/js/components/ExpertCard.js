import React, { Component } from 'react';

import Links from '../shared/Links';
import Avatar from '../shared/Avatar';

import {
  Card,
  CardMedia,
  CardTitle 
} from 'material-ui';

class ExpertCard extends Component {
  getExpertDescription () {
    if (this.props.expert.description != null) {
      return this.props.expert.description;
    }
    return '';
  }


  getExpertOccupation () {
    if (this.props.expert.occupation != null) {
      return this.props.expert.occupation;
    }
    return '';
  }


  showAccuracy () {
    let accuracy = this.props.expert.accuracy;
    return Math.floor(accuracy * 100) + "%";
  }


  getCommentInfo () {
    let expert = this.props.expert;
    return expert.comments_count + " comments";
  }


  expertCardStyle () {
    return {
      height: "100%",
      position: "relative"
    };
  }


  viewButtonStyle () {
    return {
      width: "100%",
      textAlign: "center"
    };
  }


  showPrimaryCategory = () => {
    const { expert } = this.props;
    if (expert.categories.length  > 0) {
      return <div className="expert-card-category">
        <span onClick={Links.goToCategory.bind(this, expert.categories[0].id)}>
          {expert.categories[0].name}
        </span>
      </div>;
    }
  }


  showRecentLinks = () => {
    const { expert } = this.props;
    [ claim_link, prediction_link ] = null;
    
    if (expert.most_recent_claim.length > 0) {
      claim_link = <a onClick={this.goToMostRecentClaim}>
        {expert.most_recent_claim[0].title}
      </a>;
    }

    if (expert.most_recent_prediction.length > 0) {
      prediction_link = <a onClick={this.goToMostRecentPrediction}>
        {expert.most_recent_prediction[0].title}
      </a>
    }

    if ((expert.most_recent_claim && expert.most_recent_claim.length > 0) ||
      (expert.most_recent_prediction && expert.most_recent_prediction.length > 0)) {
      return <div className="expert-card-links">
        {claim_link}
        {prediction_link}
      </div>
    }
  }


  render () {
    const { expert } = this.props;

    let card_title = <CardTitle title={expert.name} subtitle={this.getExpertOccupation()} />

    return <div className="expert__card">
      <Card style={this.expertCardStyle()}>
        <CardMedia
          overlay={card_title}
          onClick={Links.goToExpert.bind(this, expert.alias)}
          className="expert-card__media"
          >
          <div
            className="expert-card__media"
            style={{backgroundImage: `url(${Avatar.getExpertAvatar(expert)})`}}
            />
        </CardMedia>
        {this.showPrimaryCategory()}
        <div className="expert-card-meta">
          <div className="expert-card-meta__left">
            {`Accuracy: ${this.showAccuracy()}`}
          </div>
          <div className="expert-card-meta__right">
            <span className="expert-card-meta__predictions">
              {expert.number_of_predictions + " P"}
            </span>
            <span className="expert-card-meta__claims">
              {expert.number_of_claims + " C"}
            </span>
          </div>
        </div>
        <div className="expert-card-comments">
          {this.getCommentInfo()}
        </div>
        {this.showRecentLinks()}
      </Card>
    </div>
  }
}

export default ExpertCard;