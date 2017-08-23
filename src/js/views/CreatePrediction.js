import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  RaisedButton,
  RefreshIndicator
} from 'material-ui';

import PredictionFields from '../components/PredictionFields';

class CreatePrediction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prediction: {
        title: '',
        description: '',
        url: '',
        prediction_date: null,
        pic: '',
        category: ''
      },
      errors: [],
      submitPredictionError: null,
      submittingPrediction: false
    };
  }


  updateField (id, val) {
    this.prediction = this.state.prediction;
    this.prediction[id] = val;
    this.setState({ prediction: this.prediction });
  }


  assemblePredictionData () {
    return this.state.prediction;
  }


  formatPredictionDate (date) {
    let d, d2;
    d = new Date(date);
    d2 = ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear();
    return d2;
  }


  createPrediction () {
    this.setState({ submitPredictionError: null });
    if (this.validateInputs()) {
      this.setState({
        submittingPrediction: true
      });
      let params = {
        path: "create_prediction",
        data: {
          title: this.state.prediction.title,
          description: this.state.prediction.description,
          url: this.state.prediction.url,
          prediction_date: this.formatPredictionDate(this.state.prediction.prediction_date),
          category: this.state.prediction.category
        },
        success: this.createPredictionSuccess,
        error: this.createPredictionError
      };

      API.c(params)
    }
  }

  createPredictionError (error) {
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ submitPredictionError: error.responseJSON.errors[0] });
    } else {
      this.setState({ submitPredictionError: "There was an error." });
    }

    this.setState({ submittingPrediction: false });
  }


  createPredictionSuccess (data) {
    this.setState({ submittingPrediction: false });
    
    if (data.prediction != null) {
      navigate("/predictions/" + data.prediction.alias + "?created=1");
    }
  }


  validateInputs () {
    this.errors = [];
    if (this.state.prediction.title.length < 3) {
      this.errors.push({
        id: "title",
        text: "Title must be at least 3 characters long."
      });
    }
    if (this.state.prediction.prediction_date === null) {
      this.errors.push({
        id: "prediction_date",
        text: "Date required for prediction."
      });
    }
    if (this.state.prediction.category === '') {
      this.errors.push({
        id: "category",
        text: "Category is required."
      });
    }
    this.setState({ errors: this.errors });
    if (this.errors.length === 0) {
      return true;
    }
    return false;
  }


  render () {
    this.style = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    }
    return <div>
      <Header />
      <div className="predictions-wrapper">
        <div className="predictions-content">
          <div className="default__card">
            <div className="text__title">
              Create Prediction
            </div>
            {UserStore.loggedIn() &&
              <div>
                <PredictionFields
                  prediction={this.state.prediction}
                  errors={state.errors}
                  updateField={this.updateField}
                  />

                if (this.state.submittingPrediction != true) {
                  <RaisedButton label="Create" onClick={this.createPrediction} />
                } else {
                  <RefreshIndicator style={this.style} size={50} left={0} top={0} status="loading" />
                }

                if (this.state.submitPredictionError) {
                  <div>
                    {this.state.submitPredictionError}
                  </div>
                }
              </div>
            }
            {!UserStore.loggedIn() &&
              <div className="not-found">
                "You must be logged in to add an prediction to the sytem."
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default CreatePrediction;