import React, { Component } from 'react';

import Header from "../components/Header";
import Footer from "components/Footer";
import PredictionCard from "components/PredictionCard";
import PredictionTextCard from "components/PredictionTextCard";
import ExpertCard from "components/ExpertCard";
import ExpertTextCard from "components/ExpertTextCard";
import ClaimCard from "components/ClaimCard";
import LoadingBlock from "components/LoadingBlock";

/*
TODO: Implement this with the new store schema
function mapStateToProps(state) {
    return { oneProp: state.oneReducer.oneProp }
}
export default connect(mapStateToProps)(MyComponent );
*/


class Landing extends Component {
  constructor(props) {
    super();
    this.state = {
      data: null,
      homepageError: false
    }
  }

  componentWillMount () {
    let params = {
      path: "homepage",
      success: this.homepageSuccess,
      error: this.homepageError
    };
    return API.c(params);
  }


  homepageSuccess (data) {
    this.setState({
      data: data,
      homepageError: false
    });
  }


  homepageError (error) {
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ homepageError: error.responseJSON.errors[0] });
    } else {
      this.setState({ homepageError: "There was an error." });
    }
  }


  showLandingLoading () {
    if (this.state.data == null) {
      return <LoadingBlock />;
    }
  }


  showLandingContent = () => {
    if (this.state.data != null) {
      const [active_predictions, settled_predictions, active_claims, settled_claims] = <div className="not-found">
        No items were found.
      </div>;

      const [most_accurate_experts, least_accurate_experts, most_popular_experts, most_popular_claims] = <div></div>;

      if (this.state.data.most_recent_active_predictions.length > 0) {
        active_predictions = this.state.data.most_recent_active_predictions.map((prediction, index) =>
          <PredictionCard prediction={prediction} key={`most-recent-active-predictions-${index}`} />
        )
      }

      if (this.state.data.most_recent_settled_predictions.length > 0) {
        settled_predictions = this.state.data.most_recent_settled_predictions.map((prediction, index) =>
          <PredictionCard prediction={prediction} key={`most-recent-settled-predictions-${index}`} />
        )
      }

      if (this.state.data.most_recent_active_claims.length > 0) {
        active_claims = this.state.data.most_recent_active_predictions.map((claim, index) =>
          <ClaimCard claim={claim} key={`most-recent-active-claims-${index}`} />
        )
      }

      if (this.state.data.most_recent_settled_claims.length > 0) {
        settled_claims = this.state.data.most_recent_settled_claims.map((claim, index) =>
          <ClaimCard claim={claim} key={`most-recent-settled-claims-${index}`} />
        )
      }

      if (this.state.data.most_accurate_experts.length > 0) {
        most_accurate_experts = this.state.data.most_accurate_experts.map((expert, index) => 
          <ExpertCard expert={expert} key={`most-accurate-experts-${index}`} />
        )
      }

      if (this.state.data.least_accurate_experts.length > 0) {
        least_accurate_experts = this.state.data.least_accurate_experts.map((expert, index) => 
          <ExpertCard expert={expert} key={`least-accurate-experts-${index}`} />
        )
      }

      if (this.state.data.most_popular_experts.length > 0) {
        most_popular_experts = this.state.data.most_popular_experts.map((expert, index) =>
          <ExpertTextCard expert={expert} key={`most-popular-experts-${index}`} />
        )
      }

      if (this.state.data.most_popular_claims.length > 0) {
        most_popular_claims = this.state.data.most_popular_claims.map((claim, index) =>
          <PredictionTextCard prediction={prediction} key={`most-popular-predictions-${index}`} />
        )
      }

      return <div>
        <div className="default__card landing__predictions__recent-active">
          <div className="text__title">
            Recent Active Predictions
          </div>
          {active_predictions}
        </div>
        <div className="default__card landing__predictions__recent-settled">
          <div className="text__title">
            Recent Settled Predictions
          </div>
          {settled_predictions}
        </div>
        <div className="default__card landing__claims__recent-active">
          <div className="text__title">
            Recent Active Claims
          </div>
          {active_claims}
        </div>
        <div className="default__card landing__claims__recent-settled">
          <div className="text__title">
            Recent Settled Claims
          </div>
          {settled_claims}
        </div>
        <div className="default__card landing__experts__text">
          <div className="text__title">
            Most Accurate Experts
          </div>
          {most_accurate_experts}
        </div>
        <div className="default__card landing__experts__text">
          <div className="text__title">
            Least Accurate Experts
          </div>
          {least_accurate_experts}
        </div>
        <div className="default__card landing__experts__text">
          <div className="landing__experts__text-column">
            <div className="text__title">
              Most Popular Experts
            </div>
            {most_popular_experts}
          </div>
          <div className="landing__experts__text-column">
            <div className="text__title">
              Most Popular Claims
            </div>
            {most_popular_claims}
          </div>
        </div>;
      </div>
    } else if (this.state.loadError != null) {
      return <div className="default__card">
        <div className="landing-error">
          {`Error: ${this.state.homepageError}`}
        </div>
      </div>
    }
  }


  render () {
    return <div>
      <Header />
      <div className="landing-wrapper">
        <div className="landing-content">
          {this.showLandingLoading()}
          {this.showLandingContent()}
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default Landing;