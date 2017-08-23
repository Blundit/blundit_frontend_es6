let AddToExpert, BookmarkIndicator, Comments, ExpertBonaFides, ExpertClaimCard, ExpertPredictionCard, Footer, Header, ImageUpload, LoadingBlock, SocialShare, a, div, img, input, ref, span;

ref = React.DOM, div = ref.div, img = ref.img, span = ref.span, input = ref.input, a = ref.a;

import Header from '../components/Header';

import Footer from '../components/Footer';

ExpertClaimCard = require("components/ExpertClaimCard");

ExpertPredictionCard = require("components/ExpertPredictionCard");

ExpertBonaFides = require("components/ExpertBonaFides");

Comments = require("components/Comments");

AddToExpert = require("components/AddToExpert");

BookmarkIndicator = require("components/BookmarkIndicator");

ImageUpload = require("components/ImageUpload");

import LoadingBlock from '../components/LoadingBlock';

SocialShare = require("components/SocialShare");

import Sessions from '../shared/Sessions';
import Links from '../shared/Links';
import Avatar from '../shared/Avatar';

module.exports = React.createFactory(React.createClass({
  getInitialState () {
    return {
      expert: null,
      claims: [],
      predictions: [],
      loadError: null,
      showCreated: this.doShowCreated(),
      user: null
    };
  },
  handleUserChange (data) {
    this.setState({
      user: UserStore.get()
    });
    if (this.state.expert === null) {
      return this.fetchExpert();
    }
  },
  componentDidMount () {
    return UserStore.subscribe(this.handleUserChange);
  },
  componentWillUnmount () {
    return UserStore.unsubscribe(this.handleUserChange);
  },
  fetchExpert () {
    params = {
      path: "expert",
      path_variables: {
        expert_id: this.props.id
      },
      success: this.expertSuccess,
      error: this.expertError
    };
    API.c(params)
  },
  expertSuccess (data) {
    this.setState({
      expert: data.expert
    });
    this.setState({
      claims: data.claims
    });
    return this.setState({
      predictions: data.predictions
    });
  },
  expertError (error) {
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      return this.setState({
        loadError: error.responseJSON.errors
      });
    }
  },
  updateBookmark (data) {
    this.expert = this.state.expert;
    this.expert.bookmark = data;
    return this.setState({
      expert: this.expert
    });
  },
  
  categoryMaterialStyle () {
    return {
      margin: 4
    };
  },
  showAccuracy (val) {
    return Math.floor(val * 100) + "%";
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
  showNewExpertText () {
    return div({
      className: "expert__created"
    }, this.state.showCreated === true ? React.createElement(Material.Chip, {
      style: this.successCardStyle(),
      onRequestDelete: this.removeAlert
    }, "Success! You've added a new expert to the system. Now you can add more information to them!") : void 0);
  },
  expertDescription () {
    let expert;
    expert = this.state.expert;
    if ((expert.description != null) && expert.description > '') {
      return expert.description;
    } else {
      return span({
        className: "not-found"
      }, "This expert has no description yet.");
    }
  },
  getExpertAttribute (expert, attribute) {
    this.na = "N/A";
    if ((expert[attribute] != null) && expert[attribute].trim() > "") {
      this.att = expert[attribute].trim();
    } else {
      this.att = this.na;
    }
    if (attribute === "website" && this.att !== this.na) {
      return a({
        href: this.att,
        target: "_blank"
      }, this.att);
    }
    if (attribute === "twitter" && this.att !== this.na) {
      return a({
        href: "https://www.twitter.com/" + this.att,
        target: "_blank"
      }, this.att);
    }
    if (attribute === "facebook" && this.att !== this.na) {
      return a({
        href: "https://www.facebook.com/" + this.att,
        target: "_blank"
      }, this.att);
    }
    if (attribute === "instagram" && this.att !== this.na) {
      return a({
        href: "http://www.instagram.com/" + this.att,
        target: "_blank"
      }, this.att);
    }
    if (attribute === "youtube" && this.att !== this.na) {
      return a({
        href: "http://www.youtube.com/channels/" + this.att,
        target: "_blank"
      }, this.att);
    }
    if (attribute === "wikipedia" && this.att !== this.na) {
      return a({
        href: "https://en.wikipedia.org/wiki/" + this.att,
        target: "_blank"
      }, this.att);
    }
    return this.att;
  },
  render () {
    let claims, expert, predictions, ref1;
    ref1 = this.state, expert = ref1.expert, predictions = ref1.predictions, claims = ref1.claims;
    return div({}, Header({}, ''), div({
      className: "experts-wrapper"
    }, div({
      className: "experts-content"
    }, expert == null ? LoadingBlock({
      title: "Expert"
    }) : void 0, expert != null ? div({
      className: "expert"
    }, this.showNewExpertText(), div({
      className: "default__card"
    }, div({
      className: "text__title expert__name"
    }, expert.name), div({
      className: "expert__avatar",
      style: {
        backgroundImage: "url(" + (Avatar.getExpertAvatar(expert)) + ")"
      }
    }, UserStore.loggedIn() ? ImageUpload({
      type: "expert",
      item_id: expert.id,
      refresh: this.fetchExpert
    }) : void 0), div({
      className: "expert__meta"
    }, div({
      className: "expert__meta-occupation"
    }, "Occupation " + (this.getExpertAttribute(expert, 'occupation'))), div({
      className: "expert__meta-description"
    }, this.expertDescription()), div({
      className: "expert__meta-website"
    }, "Website: " + (this.getExpertAttribute(expert, 'website'))), div({
      className: "expert__meta-location"
    }, "Location: " + (this.getExpertAttribute(expert, 'city')) + ", " + (this.getExpertAttribute(expert, 'country'))), div({
      className: "expert__meta-twitter"
    }, "Twitter: ", this.getExpertAttribute(expert, 'twitter')), div({
      className: "expert__meta-facebook"
    }, "Facebook:", this.getExpertAttribute(expert, 'facebook')), div({
      className: "expert__meta-instagram"
    }, "Instagram: ", this.getExpertAttribute(expert, 'instagram')), div({
      className: "expert__meta-youtube"
    }, "Youtube Channel: ", this.getExpertAttribute(expert, 'youtube')), div({
      className: "expert__meta-wikipedia"
    }, "Wikipedia: ", this.getExpertAttribute(expert, 'wikipedia'))), UserStore.loggedIn() ? div({
      className: "expert__bookmark"
    }, BookmarkIndicator({
      bookmark: this.state.expert.bookmark,
      type: "expert",
      id: expert.id,
      updateBookmark: this.updateBookmark
    })) : void 0), SocialShare({
      item: expert,
      type: "expert"
    }), div({
      className: "default__card expert__categories"
    }, div({
      className: "text__title"
    }, "Categories"), div({
      className: "text__normal"
    }, "These are the categories this expert is connected to:"), expert.categories.length === 0 ? div({
      className: "not-found"
    }, "No categories yet.") : div({}, expert.categories.map((function(_this) {
      return function(category, index) {
        return React.createElement(Material.Chip, {
          onTouchTap: Links.category.bind(_this, category.id),
          key: "expert-category-chip-" + index,
          style: _this.categoryMaterialStyle()
        }, category.name);
      };
    })(this)))), div({
      className: "default__card expert__accuracy"
    }, "This expert has an overall accuracy of: " + (this.showAccuracy(expert.accuracy)), div({
      className: "expert__accuracy-categories"
    }, "Accuracy by Category: ", expert.category_accuracies.length > 0 ? expert.category_accuracies.map((function(_this) {
      return function(accuracy, index) {
        return div({
          className: "expert__accuracy-category",
          key: "expert-accuracy-category-" + index
        }, div({
          className: "expert__accuracy-category__name"
        }, "" + accuracy.category_name), div({
          className: "expert__accuracy-category__claim"
        }, "Claims: " + (_this.showAccuracy(accuracy.claim_accuracy)) + " (" + accuracy.correct_claims + "/" + (accuracy.correct_claims + accuracy.incorrect_claims) + " C)"), div({
          className: "expert__accuracy-category__prediction"
        }, "Predictions: " + (_this.showAccuracy(accuracy.prediction_accuracy)) + " (" + accuracy.correct_predictions + "/" + (accuracy.correct_predictions + accuracy.incorrect_predictions) + " P)"));
      };
    })(this)) : div({
      className: "not-found"
    }, "No category accuracies to display."))), ExpertBonaFides({
      expert: expert,
      refresh: this.fetchExpert
    }), div({
      className: "default__card expert__predictions"
    }, div({
      className: "text__title"
    }, "Predictions this expert has made:"), div({
      className: "expert__predictions-list"
    }, predictions.length > 0 ? predictions.map(function(prediction, index) {
      return ExpertPredictionCard({
        expert: expert,
        key: "expert-prediction-card-" + index,
        prediction: prediction
      });
    }) : div({
      className: "not-found"
    }, "No predictions"), AddToExpert({
      expert: expert,
      type: "prediction",
      items: this.state.predictions,
      refresh: this.fetchExpert
    }))), div({
      className: "default__card expert__claims"
    }, div({
      className: "text__title"
    }, "Claims this expert has made:"), div({
      className: "expert__claims-list"
    }, claims.length > 0 ? claims.map(function(claim, index) {
      return ExpertClaimCard({
        expert: expert,
        claim: claim,
        key: "expert-claim-card-" + index
      });
    }) : div({
      className: "not-found"
    }, "No claims found."), UserStore.loggedIn() ? AddToExpert({
      expert: expert,
      type: "claim",
      items: this.state.claims,
      refresh: this.fetchExpert
    }) : void 0)), Comments({
      type: "expert",
      item: expert,
      id: expert.id,
      num: expert.comments_count
    })) : div({}, this.state.loadError))), Footer({}, ''));
  }
}));
