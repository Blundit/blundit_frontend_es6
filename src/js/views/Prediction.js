import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PredictionExpertCard from "../components/PredictionExpertCard";
import Comments from "../components/Comments";
import Votes from "../components/Votes";
import AddToPrediction from "../components/AddToPrediction";
import PredictionEvidences from "../components/PredictionEvidences";
import BookmarkIndicator from "../components/BookmarkIndicator";
import ImageUpload from "../components/ImageUpload";
import LoadingBlock from '../components/LoadingBlock';
import SocialShare from "../components/SocialShare";

import {
  Chip
} from 'material-ui';

import Sessions from '../shared/Sessions';
import Links from '../shared/Links';
import Dates from '../shared/Dates';
import Avatar from '../shared/Avatar';

class Prediction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prediction: null,
      experts: [],
      loadError: null,
      showCreated: this.doShowCreated(),
      voteSubmitted: null,
      voteSubmitting: false,
      user: null
    };
  }


  handleUserChange (data) {
    this.setState({ user: UserStore.get() });
    if (this.state.prediction === null) {
      this.fetchPrediction();
    }
  }

  
  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
  }


  componentWillUnmount () {
    UserStore.unsubscribe(this.handleUserChange);
  }


  fetchPrediction () {
    let params = {
      path: "prediction",
      path_variables: {
        prediction_id: this.props.id
      },
      success: this.predictionSuccess,
      error: this.predictionError
    };
    API.c(params)
  }


  predictionSuccess (data) {
    this.setState({
      prediction: data.prediction,
      experts: data.experts
    });
  }


  predictionError (error) {
    this.setState({ loadError: error.responseJSON.errors });
  }


  updateBookmark (data) {
    this.prediction = this.state.prediction;
    this.prediction.bookmark = data;
    this.setState({ prediction: this.prediction });
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


  showNewPredictionText () {
    return <div className="prediction__created">
      {this.state.showCreated == true && 
        <Chip style={this.successCardStyle()} onRequestDelete={this.removeAlert}>
          Success! You've added a new prediction to the system. Now you can add more information to it!
        </Chip>
      }
    </div>
  }

  vote (v) {
    let prediction = this.state.prediction;
    this.setState({ voteSubmitting: true });
    
    let params = {
      path: "vote_for_prediction",
      path_variables: {
        prediction_id: prediction.id
      },
      data: {
        value: v
      },
      success: this.voteSuccess,
      error: this.voteError
    };

    API.c(params)
  }


  voteSuccess (data) {
    this.setState({
      voteSubmitting: false,
      voteSubmitted: true
    });
  }


  voteError (error) {
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


  showStatus () {
    let prediction = this.state.prediction;
    if (prediction != null) {
      if (prediction.open === false) {
        return "Not Yet Open";
      } else if (prediction.open === true) {
        return "Open";
      } else if (prediction.status === 1) {
        return "Closed";
      }
    } else {
      return "Unknown";
    }
  }


  predictionDescription () {
    let prediction = this.state.prediction;
    if ((prediction.description != null) && prediction.description > '') {
      return prediction.description;
    } else {
      return <span className="note-found">
        This prediction has no description.
      </span>
    }
  }


  render () {
    const { prediction, experts } = this.state;

    return <div>
      <Header />
      <div className="predictions-wrapper">
        <div className="predictions-content">
          {!prediction &&
            <LoadingBlock title="Prediction" />
          }
          {prediction &&
            <div className="prediction">
              @showNewPredictionText()
              <div className="default__card">
                <div className="text__title prediction__title">
                  prediction.title
                </div>
                <div
                  className="prediction__image"
                  style={{backgroundImage:`url(${thisgetPredictionAvatar(prediction)})`}}
                  >
                  {UserStore.loggedIn() &&
                    <ImageUpload
                      type="prediction"
                      item_id={prediction.id}
                      refresh={this.fetchPrediction}
                      />
                  }
                </div>
                <div className="prediction__meta">
                  <div className="prediction__meta-date">
                    {`This prediction will happen by ${this.formatDate(prediction.prediction_date)}`}
                  </div>
                  <div className="prediction__meta-status">
                    {`This prediction is ${this.showStatus()}`}
                  </div>
                  <div className="prediction__meta-description">
                    {this.predictionDescription()}
                  </div>
                  <div className="not-found">
                    TODO: Add other fields here
                  </div>
                </div>
                {UserStore.loggedIn() && 
                  <div className="prediction__meta-bookmark">
                    <BookmarkIndicator
                      bookmark={this.state.prediction.bookmark}
                      type="prediction"
                      id={this.prediction.id}
                      updateBookmark={this.updateBookmark}
                      />
                  </div>
                }
              </div>
              <SocialShare
                item={prediction}
                type="prediction"
                />
              <div className="default__card prediction__categories">
                <div className="text__title">
                  Categories
                </div>
                <div className="text__normal">
                  These are the categories this prediction is connected to:
                </div>
                {prediction.categories.length == 0 &&
                  <div className="not-found">
                    No categories yet.
                  </div>
                }
                {prediction.categories.length > 0 &&
                  <div>
                    {prediction.categories.map((category, index) =>
                      <Chip 
                        onTouchTap={this.goToCategory.bind(this, category.id)}
                        key={`prediction-category-chip-${index}`}
                        style={this.categoryMaterialStyle()}
                        >
                        category.name
                      </Chip>
                    )}
                  </div>
                }
              </div>
              <div className="default__card prediction__accuracy">
                <div className="text__title">
                  Accuracy
                </div>
                {`This prediction is marked: ${this.showAccuracy(prediction.vote_value)}`}
              </div>
              <div className="default__card prediction__experts">
                <div className="text__title prediction__experts-name">
                  Experts
                </div>
                <div className="prediction__experts-list">
                  {experts.length > 0 &&
                    experts.map((expert, index) =>
                      <PredictionExpertCard
                        expert={expert}
                        prediction={this.prediction}
                        key={`prediction-expert-${index}"`}
                        />
                    )
                  }
                  {experts.length == 0 &&
                    <div>No Experts</div>
                  }
                </div>
                {UserStore.loggedIn() &&
                  <AddToPrediction
                    prediction={prediction}
                    type="prediction"
                    items={experts}
                    refresh={this.fetchPrediction}
                    />
                }
              </div>
              <PredictionEvidences
                evidences={prediction.evidences}
                prediction={prediction}
                refresh={fetchPrediction}
                />
              <Votes
                type="prediction"
                item={prediction}
                vote={this.vote}
                submitting={this.state.voteSubmitting}
                submitted={this.state.voteSubmitted}
                />
              <Comments
                type="prediction"
                id={prediction.id}
                item={prediction}
                num={prediction.comments_count}
                />
            </div>
          }
          {!prediction &&
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

export default Prediction;
