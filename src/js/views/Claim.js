import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  Chip
} from 'material-ui'

import ClaimExpertCard from "../components/ClaimExpertCard";
import Comments from "../components/Comments";
import Votes from "../components/Votes";
import AddToClaim from "../components/AddToClaim";
import ClaimEvidences from "../components/ClaimEvidences";
import BookmarkIndicator from "../components/BookmarkIndicator";
import ImageUpload from "../components/ImageUpload";
import LoadingBlock from '../components/LoadingBlock';
import SocialShare from "../components/SocialShare";
import NotFound from "../shared/NotFound";

import Sessions from '../shared/Sessions';
import Links from '../shared/Links';
import Avatar from '../shared/Avatar';

class Claim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claim: null,
      experts: [],
      loadError: null,
      showCreated: this.doShowCreated(),
      voteSubmitted: null,
      voteSubmitting: false,
      user: null
    };
  }


  handleUserChange = (data) => {
    this.setState({ user: UserStore.get() });
    if (this.state.claim === null) {
      this.fetchClaim();
    }
  }


  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
  }


  componentWillUnmount () {
    UserStore.unsubscribe(this.handleUserChange);
  }


  fetchClaim () {
    let params = {
      path: "claim",
      path_variables: {
        claim_id: this.props.id
      },
      success: this.claimSuccess,
      error: this.claimError
    };

    API.c(params)
  }

  claimSuccess = (data) => {
    this.setState({
      claim: data.claim,
      experts: data.experts
    });
  }
  claimError = (error) => {
    this.setState({
      loadError: error.responseJSON.errors
    });
  }


  updateBookmark = (data) => {
    this.claim = this.state.claim;
    this.claim.bookmark = data;
   
    return this.setState({ claim: this.claim });
  }


  successCardStyle () {
    return {
      backgroundColor: "#237a0b",
      color: "#ffffff",
      margin: 4
    };
  }


  removeAlert () {
    this.setState({ showCreated: false });
  }


  doShowCreated () {
    if (Sessions.getURLParameter("created") === 1 || Sessions.getURLParameter("created") === "1") {
      return true;
    } 
    return false;
  }


  showNewClaimText () {
    return <div className="claim__created">
      {this.state.showCreated === true ? <Chip style={this.successCardStyle()} onRequestDelete={this.removeAlert}>
      Success! You've added a new claim to the system. Now you can add more information to it!</Chip> : void 0}
    </div>;
  }


  vote (v) {
    const { claim } = this.state;
    this.setState({ voteSubmitting: true });

    let params = {
      path: "vote_for_claim",
      path_variables: {
        claim_id: claim.id
      },
      data: {
        value: v
      },
      success: this.voteSuccess,
      error: this.voteError
    };

    API.c(params)
  }


  voteSuccess = (data) => {
    this.setState({
      voteSubmitting: false,
      voteSubmitted: true
    });
  }


  voteError = (error) => {
    this.setState({
      voteSubmitting: false,
      voteSubmitted: false
    });
  }


  categoryMaterialStyle () {
    return {
      margin: 4
    };
  }


  showAccuracy (val) {
    if (val === null) {
      return "Unknown";
    } else {
      if (val >= 0.5) {
        return "Correct";
      } else {
        return "Incorrect";
      }
    }
  }


  claimDescription () {
    let claim = this.state.claim;
    if ((claim.description != null) && claim.description > '') {
      return claim.description;
    } else {
      return <NotFound>This claim has no description.</NotFound>;
    }
  }


  showStatus () {
    let claim = this.state.claim;
    if (claim != null) {
      if (claim.open === false) {
        return "Not Yet Open";
      } else if (claim.open === true) {
        return "Open";
      } else if (claim.status === 1) {
        return "Closed";
      }
    }
    return "Unknown";
  }

  showClaim () {
    const { claim, experts, user } = this.state;
    let claim_categories;

    [ image_upload, add_to_claim ] = null;
    if (!claim) { return; }

    if (claim.categories.length == 0) {
      claim_categories = <div className="not-found">
        No categories yet.
      </div>
    } else {
      claim_categories = <div className="default__card">
        {claim.categories.map((category, index) =>
          <Chip
            onTouchTap={Links.goToCategory.bind(this, category.id)}
            key={`claim-category-chip-${index}`}
            style={this.categoryMaterialStyle()}
            >
            {category.name}
          </Chip>
        )}
      </div>
    } 

    if (user && user.token) {
      add_to_claim = <AddToClaim
        claim={claim}
        type="claim"
        items={experts}
        refresh={this.fetchClaim}
      />
    }

    return <div className="claim">
      {this.showNewClaimText()}
      <div className="default__card">
        <div className="text__title claim__title">
          {claim.title}
        </div>
        <div
          className="claim__image"
          style={{backgroundImage: `url(${this.getClaimAvatar(claim)})`}}
          >
          {image_upload}
        </div>
        <div className="claim__meta">
          <div className="claim__meta-status">
            {`This claim is ${this.showStatus()}`}
          </div>
          <div className="claim__meta-description">
            {this.claimDescription()}
          </div>
          <div className="not-found">
            TODO: Add other fields here.
          </div>
        </div>
        {bookmark_indicator}
      </div>
      <SocialShare
        item={claim}
        type="claim"
      />
      <div className="default__card claim__categories">
        <div className="text__title">
          Categories
        </div>
        <div className="text__normal">
          These are the categories this claim is connected to:
        </div>
        {claim_categories}
      </div>
      <div className="default__card claim__accuracy">
        <div className="text__title">
          Accuracy
        </div>
        {`This claim is marked: ${this.showAccuracy(claim.vote_value)}`}
      </div>
      <Votes
        type="claim"
        item={claim}
        vote={this.vote}
        submitting={this.state.voteSubmitting}
        submitted={this.state.voteSubmitted}
      />
      <div className="default__card claim__experts">
        <div className="text__title claim__experts-name">
          Experts
        </div>
        <div className="claim__experts-list">
          {experts.map((expert, index) =>
              <ClaimExpertCard
                expert={expert}
                claim={claim}
                key={`claim-expert-${index}`}
              />
          )}
        </div>
        {add_to_claim}
      </div>
      <ClaimEvidences
        evidences={claim.evidences}
        claim={claim}
        refresh={this.fetchClaim}
      />
      <Comments
        type="claim"
        id={claim.id}
        item={claim}
        num={claim.comments_count}
      />
    </div>
  }


  render () {
    const { claim, experts, user } = this.state;
    [ loading_block, bookmark_indicator, show_error ] = null;

    if (!claim) {
      loading_block = <LoadingBlock text="Claim"/>
    }

    if (UserStore.loggedIn()) {
      image_upload = <ImageUpload
        type="claim" 
        item_id={claim.id}
        refresh={this.fetchClaim} 
      />;
    }

    if (user && user.token) {
      bookmark_indicator = <div className="claim__bookmark">
        <BookmarkIndicator
          bookmark={this.state.claim.bookmark}
          type="claim"
          id={claim.id}
          updateBookmark={this.updateBookmark}
        />
      </div>
    }

    if (!claim) {
      show_error = <div>{this.state.loadError}</div>;
    }

    <div>
      <Header></Header>
      <div className="claims-wrapper">
        <div className="claims-content">
          {loading_block}
          {this.showClaim()}
          {load_error}
        </div>
      </div>
      <Footer></Footer>
    </div>
  }
}

export default Claim;
