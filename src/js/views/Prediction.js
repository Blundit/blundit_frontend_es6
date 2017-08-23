let AddToPrediction, BookmarkIndicator, Comments, DateMixin, Footer, Header, ImageUpload, LoadingBlock, PredictionEvidences, PredictionExpertCard, SocialShare, Votes, div, img, ref, span;

ref = React.DOM, div = ref.div, img = ref.img, span = ref.span;

import Header from '../components/Header';

import Footer from '../components/Footer';

PredictionExpertCard = require("components/PredictionExpertCard");

Comments = require("components/Comments");

Votes = require("components/Votes");

AddToPrediction = require("components/AddToPrediction");

PredictionEvidences = require("components/PredictionEvidences");

BookmarkIndicator = require("components/BookmarkIndicator");

ImageUpload = require("components/ImageUpload");

import LoadingBlock from '../components/LoadingBlock';

SocialShare = require("components/SocialShare");

import Sessions from '../shared/Sessions';
import Links from '../shared/Links';
import Dates from '../shared/Dates';
import Avatar from '../shared/Avatar';

module.exports = React.createFactory(React.createClass({
  getInitialState () {
    return {
      prediction: null,
      experts: [],
      loadError: null,
      showCreated: this.doShowCreated(),
      voteSubmitted: null,
      voteSubmitting: false,
      user: null
    };
  },
  handleUserChange (data) {
    this.setState({
      user: UserStore.get()
    });
    if (this.state.prediction === null) {
      return this.fetchPrediction();
    }
  },
  componentDidMount () {
    return UserStore.subscribe(this.handleUserChange);
  },
  componentWillUnmount () {
    return UserStore.unsubscribe(this.handleUserChange);
  },
  fetchPrediction () {
    params = {
      path: "prediction",
      path_variables: {
        prediction_id: this.props.id
      },
      success: this.predictionSuccess,
      error: this.predictionError
    };
    API.c(params)
  },
  predictionSuccess (data) {
    this.setState({
      prediction: data.prediction
    });
    return this.setState({
      experts: data.experts
    });
  },
  predictionError (error) {
    return this.setState({
      loadError: error.responseJSON.errors
    });
  },
  updateBookmark (data) {
    this.prediction = this.state.prediction;
    this.prediction.bookmark = data;
    return this.setState({
      prediction: this.prediction
    });
  },
  successCardStyle () {
    return {
      backgroundColor: "#237a0b",
      color: "#ffffff",
      margin: 4
    };
  },
  removeAlert () {
    return this.setState({
      showCreated: false
    });
  },
  doShowCreated () {
    if (Sessions.getURLParameter("created") === 1 || Sessions.getURLParameter("created") === "1") {
      return true;
    } else {
      return false;
    }
  },
  showNewPredictionText () {
    return div({
      className: "prediction__created"
    }, this.state.showCreated === true ? React.createElement(Material.Chip, {
      style: this.successCardStyle(),
      onRequestDelete: this.removeAlert
    }, "Success! You've added a new prediction to the system. Now you can add more information to it!") : void 0);
  },
  vote (v) {
    let params, prediction;
    prediction = this.state.prediction;
    this.setState({
      voteSubmitting: true
    });
    params = {
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
  },
  voteSuccess (data) {
    this.setState({
      voteSubmitting: false
    });
    return this.setState({
      voteSubmitted: true
    });
  },
  voteError (error) {
    this.setState({
      voteSubmitting: false
    });
    return this.setState({
      voteSubmitted: false
    });
  },
  categoryMaterialStyle () {
    return {
      margin: 4
    };
  },
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
  },
  showStatus () {
    let prediction;
    prediction = this.state.prediction;
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
  },
  predictionDescription () {
    let prediction;
    prediction = this.state.prediction;
    if ((prediction.description != null) && prediction.description > '') {
      return prediction.description;
    } else {
      return span({
        className: "not-found"
      }, "This prediction has no description.");
    }
  },
  render () {
    let experts, prediction, ref1;
    ref1 = this.state, prediction = ref1.prediction, experts = ref1.experts;
    return div({}, Header({}, ''), div({
      className: "predictions-wrapper"
    }, div({
      className: "predictions-content"
    }, prediction == null ? LoadingBlock({
      title: "Prediction"
    }) : void 0, prediction != null ? div({
      className: "prediction"
    }, this.showNewPredictionText(), div({
      className: "default__card"
    }, div({
      className: "text__title prediction__title"
    }, prediction.title), div({
      className: "prediction__image",
      style: {
        backgroundImage: "url(" + (Avatar.getPredictionAvatar(prediction)) + ")"
      }
    }, UserStore.loggedIn() ? ImageUpload({
      type: "prediction",
      item_id: prediction.id,
      refresh: this.fetchPrediction
    }) : void 0), div({
      className: "prediction__meta"
    }, div({
      className: "prediction__meta-date"
    }, "This prediction will happen by " + (Dates.formatDate(prediction.prediction_date))), div({
      className: "prediction__meta-status"
    }, "This prediction is " + (this.showStatus())), div({
      className: "prediction__meta-description"
    }, this.predictionDescription()), div({
      className: "not-found"
    }, "TODO: Add other fields here")), UserStore.loggedIn() ? div({
      className: "prediction__meta-bookmark"
    }, BookmarkIndicator({
      bookmark: this.state.prediction.bookmark,
      type: "prediction",
      id: prediction.id,
      updateBookmark: this.updateBookmark
    })) : void 0), SocialShare({
      item: prediction,
      type: "prediction"
    }), div({
      className: "default__card prediction__categories"
    }, div({
      className: "text__title"
    }, "Categories"), div({
      className: "text__normal"
    }, "These are the categories this prediction is connected to:"), prediction.categories.length === 0 ? div({
      className: "not-found"
    }, "No categories yet.") : div({}, prediction.categories.map((function(_this) {
      return function(category, index) {
        return React.createElement(Material.Chip, {
          onTouchTap: Links.category.bind(_this, category.id),
          key: "prediction-category-chip-" + index,
          style: _this.categoryMaterialStyle()
        }, category.name);
      };
    })(this)))), div({
      className: "default__card prediction__accuracy"
    }, div({
      className: "text__title"
    }, "Accuracy"), "This prediction is marked: " + (this.showAccuracy(prediction.vote_value))), div({
      className: "default__card prediction__experts"
    }, div({
      className: "text__title prediction__experts-name"
    }, "Experts"), div({
      className: "prediction__experts-list"
    }, experts.length > 0 ? experts.map(function(expert, index) {
      return PredictionExpertCard({
        expert: expert,
        prediction: prediction,
        key: "prediction-expert-" + index
      });
    }) : "No experts"), UserStore.loggedIn() ? AddToPrediction({
      prediction: prediction,
      type: "prediction",
      items: experts,
      refresh: this.fetchPrediction
    }) : void 0), PredictionEvidences({
      evidences: prediction.evidences,
      prediction: prediction,
      refresh: this.fetchPrediction
    }), Votes({
      type: "prediction",
      item: prediction,
      vote: this.vote,
      submitting: this.state.voteSubmitting,
      submitted: this.state.voteSubmitted
    }), Comments({
      type: "prediction",
      id: prediction.id,
      item: prediction,
      num: prediction.comments_count
    })) : div({}, this.state.loadError))), Footer({}, ''));
  }
}));
