import React, { Component } from 'react';
import NotFound from '../shared/NotFound';

class Votes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }


  handleUserChange = (data) => {
    this.setState({ user: UserStore.get() });
  }


  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
  }


  componentWillUnmount () {
    UserStore.unsubscribe(this.handleUserChange);
  }


  getVoteValText () {
    const { item } = this.props;

    if (item.user_vote) {
      return item.user_vote.vote == 1 ? "True" : "False";
    }
    
    return "N/A";
  }


  voteYes = () => {
    this.props.vote(1);
  }

  
  voteNo = () => {
    this.props.vote(0);
  }


  notOpenYet () {
    const { type, item } = this.props;

    if (type !== "prediction") {
      return false;
    }

    let d1 = new Date(item.prediction_date);
    let d2 = new Date();

    if (d1 > d2) {
      return true;
    } else {
      return false;
    }
  }


  refreshStyle () {
    return {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    };
  }


  showVoteOpen (item, submitted, submitting) {
    let is_submitting, user_vote;
    [ submitting_error ] = null;
    // TODO Refactor this to be more legible
    if (item.open == "true" || item.open == true) {
      if (user && user.token) {
        if (submitted != true) {
          // item is open, user exists, user hasn't successfully voted in this view.

          // generating variables start
          // ==========================
          if (submitted == false) {
            // error voting
            submitting_error = <div>
              There was an error. Please try again."
            </div>
          }

          if (submitting == true) {
            // user attempting to vote
            is_submitting = <RefreshIndicator style={this.refreshStyle()} size={50} left={0} top={0} status="loading" />;
          } else {
            is_submitting = <div>
              <RaisedButton label="I think it's true" primary={true} onClick={this.voteYes} />
              <RaisedButton label="I think it's false" primary={true} onClick={this.voteNo} />
              {submitting_error}
            </div>;
          }

          if (item.user_vote) {
            // user has voted
            user_vote = <div className="#{type}__vote__info-already-voted">
              {`You have already voted for this item. (You thought it was ${@getVoteValText()})`}
            </div>;
          } else {
            // user hasn't voted
            user_vote = <div className="#{type}__vote__info-buttons">
              {is_submitting}
            </div>;
          }

          // ==========================
          // generating variables end

          return <div className={`${type}__vote__info`}>
            {user_vote}
          </div>
        } else {
          // submitted == true
          return <div className={`${type}__vote__info-voted`}>
            Thank you for your vote!
          </div>
        }
      } else {
        // no user
        return <div className={`${type}__vote--not-logged-in`}>
          {`You must be logged in to vote on this ${type}`}
        </div>
      }
    }
  }


  showVoteClosed (type) {
    let closed_reason = `This ${type} is closed, and can't be voted on.`;
    if (this.notOpenYet()) {
      closed_reason = `This ${type} isn't open yet. Come back later to vote on it.`;
    }

    if (!!item.open == false) {
      return <div className="#{type}__vote--closed">
        {closed_reason}
      </div>
    }
  }


  render () {
    const { type, item, submitting, submitted } = this.props;
    const { user } = this.state;
    let num_votes;

    if (item.votes_count == 0) {
      num_votes = <NotFound>{`Be the first person to vote on this ${type}`}</NotFound>;
    } else {
      num_votes = <div>{`This ${type} has ${item.votes_count} votes so far!`}</div>;
    }

    return <div className="default__card #{type}__vote">
      <div className="text__title">
        Votes
      </div>
      <div className={`text__normal ${type}__vote__meta`}>
        {num_votes}
      </div>
      {this.showVoteOpen(item, submitted, submitting)}
      {this.showVoteClosed(type)}
    </div>;  
  }
}



export default Votes;
