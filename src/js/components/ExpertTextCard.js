import React, { Component } from 'react';
import Links from '../shared/Links';
import Avatar from '../shared/Avatar';

class ExpertTextCard extends Component {
  showAccuracy () {
    let accuracy;
    accuracy = this.props.expert.accuracy;
    return Math.floor(accuracy * 100) + "%";
  }


  getCommentsCount (count) {
    if (count < 1000) {
      return count;
    } else if (count >= 1000 && count < 1000000) {
      return Math.floor((count / 1000) * 10) / 10 + "K";
    } else if (count >= 1000000 && count < 1000000000) {
      return Math.floor((count / 1000000) * 10) / 10 + "M";
    } else if (count >= 1000000000 && count < 1000000000000) {
      return Math.floor((count / 1000000000) * 10) / 10 + "B";
    } else {
      return "Inf";
    }
  }


  render () {
    const { expert } = this.props;

    return <div className="expert-text-card">
      <div
        className="expert-text-card__avatar"
        style={{backgroundImage: `url(${this.getExpertAvatar(expert)})`}}
        />
      <div
        className="expert-text-card__name"
        onClick={this.goToExpert.bind(this, expert.alias)}
        >
        {expert.name}
      </div>
      <div className="expert-text-card__comments">
        {this.getCommentsCount(expert.comments_count)}
        <span className="fa fa-comment"></span>
      </div>
    </div>;
  }
}

export default ExpertTextCard;
