import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import ExpertClaimCard from "../components/ExpertClaimCard";
import ExpertPredictionCard from "../components/ExpertPredictionCard";
import ExpertBonaFides from "../components/ExpertBonaFides";
import Comments from "../components/Comments";
import AddToExpert from "../components/AddToExpert";
import BookmarkIndicator from "../components/BookmarkIndicator";
import ImageUpload from "../components/ImageUpload";
import LoadingBlock from '../components/LoadingBlock';
import SocialShare from "../components/SocialShare";

import {
  Chip
} from 'material-ui';

import Sessions from '../shared/Sessions';
import Links from '../shared/Links';
import Avatar from '../shared/Avatar';

class Expert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expert: null,
      claims: [],
      predictions: [],
      loadError: null,
      showCreated: this.doShowCreated(),
      user: null
    };
  }


  handleUserChange (data) {
    this.setState({ user: UserStore.get() });
    if (this.state.expert === null) {
      this.fetchExpert();
    }
  }


  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
  }


  componentWillUnmount () {
    UserStore.unsubscribe(this.handleUserChange);
  }


  fetchExpert () {
    let params = {
      path: "expert",
      path_variables: {
        expert_id: this.props.id
      },
      success: this.expertSuccess,
      error: this.expertError
    };
    API.c(params)
  }


  expertSuccess (data) {
    this.setState({
      expert: data.expert,
      claims: data.claims,
      predictions: data.predictions
    });
  }


  expertError (error) {
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({
        loadError: error.responseJSON.errors
      });
    }
  }


  updateBookmark (data) {
    this.expert = this.state.expert;
    this.expert.bookmark = data;
    this.setState({ expert: this.expert });
  }

  
  categoryMaterialStyle () {
    return {
      margin: 4
    };
  }


  showAccuracy (val) {
    return Math.floor(val * 100) + "%";
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
    } else {
      return false;
    }
  }


  showNewExpertText () {
    return <div className="expert__created">
      {this.state.showCreated === true &&
        <Chip
          style={this.successCardStyle()}
          onRequestDelete={this.removeAlert}
          >
          Success! You've added a new expert to the system. Now you can add more information to them!
        </Chip>
      }
    </div>
  }


  expertDescription () {
    let expert = this.state.expert;
    if ((expert.description != null) && expert.description > '') {
      return expert.description;
    } else {
      return <span className="not-found">
        This expert has no description yet.
      </span>
    }
  }


  getExpertAttribute (expert, attribute) {
    let na = "N/A";
    let att = na;
    
    if ((expert[attribute] != null) && expert[attribute].trim() > "") {
      att = expert[attribute].trim();
    } 

    if (attribute === "website" && att !== na) {
      return <a href={att} target="_blank">{att}</a>
    }

    if (attribute === "twitter" && att !== na) {
      return <a href={`https://www.twitter.com/${att}`} target="_blank">{att}</a>
    }

    if (attribute === "facebook" && att !== na) {
      return <a href={`https://www.facebook.com/${att}`} target="_blank">{att}</a>
    }

    if (attribute === "instagram" && att !== na) {
      return <a href={`http://www.instagram.com/${att}`} target="_blank">{att}</a>
    }

    if (attribute === "youtube" && att !== na) {
      return <a href={`http://www.youtube.com/channels/${att}`} target="_blank">{att}</a>
    }

    if (attribute === "wikipedia" && att !== na) {
      return <a href={`https://en.wikipedia.org/wiki/${att}`} target="_blank">{att}</a>
    }

    return att;
  }


  render () {
    const { expert, predictions, claims } = this.state
    
    return <div>
      <Header />
      <div className="experts-wrapper">
        <div className="experts-content">
          {!expert &&
            <LoadingBlock title="Expert" />
          }
              
          {expert &&
            <div className="expert">
              {this.showNewExpertText()}
              <div className="default__card">
                <div className="text__title expert__name">
                  {expert.name}
                </div>
                <div
                  className="expert__avatar"
                  style={{
                    backgroundImage: `url(${this.getExpertAvatar(expert)})`
                  }}
                  >
                  {UserStore.loggedIn() &&
                    <ImageUpload
                      type="expert"
                      item_id={expert.id}
                      refresh={this.fetchExpert}
                      />
                  }
                </div>
                <div className="expert__meta">
                  <div className="expert__meta-occupation">
                    {`Occupation ${this.getExpertAttribute(expert, 'occupation')}`}
                  </div>
                  <div className="expert__meta-description">
                    {this.expertDescription()}
                  </div>
                  <div className="expert__meta-website">
                    {`Website: #{this.getExpertAttribute(expert, 'website')}`}
                  </div>
                  <div className="expert__meta-location">
                    {`Location: ${this.getExpertAttribute(expert, 'city')}, ${this.getExpertAttribute(expert, 'country')}`}
                  </div>
                  <div className="expert__meta-twitter">
                    Twitter:
                    {this.getExpertAttribute(expert, 'twitter')}
                  </div>
                  <div className="expert__meta-facebook">
                    Facebook:
                    {this.getExpertAttribute(expert, 'facebook')}
                  </div>
                  <div className="expert__meta-instagram">
                    Instagram:
                    {this.getExpertAttribute(expert, 'instagram')}
                  </div>
                  <div className="expert__meta-youtube">
                    Youtube Channel:
                    {this.getExpertAttribute(expert, 'youtube')}
                  </div>
                  <div className="expert__meta-wikipedia">
                    Wikipedia:
                    {this.getExpertAttribute(expert, 'wikipedia')}
                  </div>
                </div>
                {UserStore.loggedIn() &&
                  <div className="expert__bookmark">
                    <BookmarkIndicator
                      bookmark={this.state.expert.bookmark}
                      type="expert"
                      id={expert.id}
                      updateBookmark={this.updateBookmark}
                      />
                  </div>
                }
              </div>
              <SocialShare 
                item={expert}
                type="expert"
                />
              <div className="default__card expert__categories">
                <div className="text__title">
                  "Categories
                </div>
                <div className="text__normal">
                  These are the categories this expert is connected to:
                </div>
                {expert.categories.length == 0 &&
                  <div className="not-found">
                    No categories yet.
                  </div>
                }
                {expert.categories.length > 0 &&
                  <div>
                    {expert.categories.map((category, index) =>
                      <Chip
                        onTouchTap={this.goToCategory.bind(this, category.id)}
                        key={`expert-category-chip-#{index}`}
                        style={this.categoryMaterialStyle()}
                        >
                        {category.name}
                      </Chip>
                    )}
                  </div>
                }
              </div>
              <div className="default__card expert__accuracy">
                {`This expert has an overall accuracy of: ${this.showAccuracy(expert.accuracy)}`}

                <div className="expert__accuracy-categories">
                  Accuracy by Category:
                  {expert.category_accuracies.length > 0 &&
                    expert.category_accuracies.map((accuracy, index) =>
                      <div
                        className="expert__accuracy-category"
                        key={`expert-accuracy-category-${index}`}
                        >
                        <div className="expert__accuracy-category__name">
                          {`${accuracy.category_name}`}
                        </div>
                        <div className="expert__accuracy-category__claim">
                          {`Claims: ${this.showAccuracy(accuracy.claim_accuracy)} (${accuracy.correct_claims}/${accuracy.correct_claims + accuracy.incorrect_claims} C)`}
                        </div>
                        <div className="expert__accuracy-category__prediction">
                          {`Predictions: ${this.showAccuracy(accuracy.prediction_accuracy)} (${accuracy.correct_predictions}/${accuracy.correct_predictions + accuracy.incorrect_predictions} P)`}
                        </div>
                      </div>
                    )
                  }
                  {expert.category_accuracies.length == 0 &&
                    <div className="not-found">
                      No category accuracies to display.
                    </div>
                  }
                </div>
              </div>
              <ExpertBonaFides
                expert={expert}
                refresh={this.fetchExpert}
                />
              <div className="default__card expert__predictions">
                <div className="text__title">
                  Predictions this expert has made:
                </div>
                <div className="expert__predictions-list">
                  {predictions.length > 0 &&
                    predictions.map((prediction, index) =>
                      <ExpertPredictionCard
                        expert={expert}
                        key={`expert-prediction-card-${index}`}
                        prediction={prediction}
                        />
                    )
                  }
                  {predictions.length == 0 &&
                    <div className="not-found">
                      No predictions
                    </div>
                  }
                  <AddToExpert
                    expert={expert}
                    type="prediction"
                    items={this.state.predictions}
                    refresh={this.fetchExpert}
                    />
                </div>
              </div>
              <div className="default__card expert__claims">
                <div className="text__title">
                  Claims this expert has made:
                </div>
                <div className="expert__claims-list">
                  {claims.length > 0 &&
                    claims.map((claim, index) =>
                      <ExpertClaimCard
                        expert={expert}
                        claim={claim}
                        key={`expert-claim-card-${index}`}
                        />
                    )
                  }
                  {claims.length > 0 &&
                    <div className="not-found">
                      No claims found.
                    </div>
                  }
                  {UserStore.loggedIn() &&
                    <AddToExpert
                      expert={expert}
                      type="claim"
                      items={this.state.claims}
                      refresh={this.fetchExpert}
                      />
                  }
                </div>
              </div>
              <Comments
                type="expert"
                item={expert}
                id={expert.id}
                num={expert.comments_count}
                />

            </div>
          }
          {!expert &&
            <div>
              {this.state.loadError}
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default Expert;