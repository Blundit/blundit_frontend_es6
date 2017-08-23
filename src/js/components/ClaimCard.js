
import React, { Component } from 'react';
import Links from '../shared/Links';
import Avatar from '../shared/Avatar';

import { 
  Card,
  CardActions
} from 'material-ui';

class ClaimCard extends Component {
  getDescription () {
    const { claim } = this.props;
    if (claim.description != null) {
      return claim.description;
    }
    return '';
  }


  getStatus () {
    const { claim } = this.props;
    if (claim.status === 0) {
      return "Uknown";
    } else if (claim.status === 1) {
      if (claim.vote_value >= 0.5) {
        return "Right";
      } else {
        return "Wrong";
      }
    }
  }


  claimDate () {
    const { claim } = this.props;
    return claim.created_at;
  }


  getVoteInfo () {
    const { claim } = this.props;
    if (claim.votes_count == null) {
      let votes = 0;
    } else {
      let votes = claim.votes_count;
    }
    return votes + " votes";
  }


  getCommentInfo () {
    const { claim } = this.props;
    return claim.comments_count + " comments";
  }


  getCategories = () => {
    const { claim } = this.props;

    if (claim.categories.length > 0) {
      return <div className="claim-card-category">
        <span onClick={this.goToCategory.bind(this, claim.categories[0].id)}>
          {claim.categories[0].name}
        </span>
      </div>
    }
  }


  getRecentExperts = () => {
    const { claim } = this.props;

    return <div className="claim-card-experts">
      {claim.recent_experts.map((expert, index) => 
        <div>
          <div
            className="claim-card-experts__expert"
            key={`claim-card-expert-${index}`}
            onClick={Links.goToExpert.bind(this, expert.alias)}
            >
              <div
                className="claim-card-experts__expert-avatar"
                style={{backgroundImage: url(`${this.getExpertAvatar(expert)}`)}}
                ></div>
          </div>
          <div className="claim-card-experts__expert-name">
            {expert.name}
          </div>
        </div>
      )}
    </div>
  }

  // TODO: Hook this up with redux
  actions = () => {
    const { claim } = this.props;

    let action = <div className="claim-card-vote">Log in to Vote</div>;

    if (claim.status == 0 && UserStore.loggedIn()) {
      action = <div className="claim-card-vote" onClick={Links.goToClaim.bind(this, claim.alias)}>
        vote
      </div>;
    }
    return <CardActions>
      {action}
    </CardActions>
  }


  render () {
    const { claim } = this.props;
    return <div className="claim-card">
      <Card>
        <div 
          className="claim-card-title"
          onClick={this.goToClaim.bind(this, claim.alias)}
          >
            {claim.title}
        </div>
        <div classname="claim-card-text">
          <div className="claim-card-meta">
            <div className="claim-card-meta__status">
              {this.getStatus()}
            </div>
            <div className="claim-card-meta__votes">
              {this.getVoteInfo()}
            </div>
            <div className="claim-card-meta__comments">
              {this.getCommentInfo()}
            </div>
          </div>
          {this.getCategories()}
          {this.getRecentExperts()}
        </div>
        {this.actions()}
      </Card>
    </div>;
  }
}

export default ClaimCard;
