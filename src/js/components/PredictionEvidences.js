import React, { Component } from 'react';
import InlineLink from "../components/InlineLink";
import NotFound from '../shared/NotFound';
import {
  TextField,
  FlatButton,
  LinearProgress
} from 'material-ui';

class PredictionEvidences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evidenceURL: '',
      error: null,
      submitting: false
    };
  }


  addItem () {
    if (this.state.evidenceUrl === '') {
      this.setState({ error: 'URL Required' });
      return false;
    }
    this.setState({
      error: null,
      submitting: true
    });

    let params = {
      path: "add_evidence_to_prediction",
      path_variables: {
        prediction_id: this.props.prediction.id
      },
      data: {
        url: this.state.evidenceURL
      },
      success: this.addSuccess,
      error: this.addError
    };

    API.c(params);
  }


  addSuccess = (data) => {
    this.setState({
      submitting: false,
      evidenceURL: ''
    });
    this.props.refresh();
  }


  addError = (error) => {
    this.setState({ 
      submitting: false,
      error: "Error adding Evidence"
    });
  }


  handleChange = (event, index, value) => {
    this.setState({ item: value });
  }


  cancelAddItem = () => {
    this.setState({
      item: null,
      showItems: false
    });
  }


  changeEvidence = (event) =>{
    this.setState({ evidenceURL: event.target.value });
  }


  render () {
    const { evidences } = this.props;
    [ not_found, show_button, show_error ] = null;

    if (evidences.length == 0) {
      not_found = <NotFound>No supporting evidence has been added yet to this prediction.</NotFound>
    }

    if (this.state.submitting == false) {
      show_button = <FlatButton label="Add" onClick={this.addItem} />;
    } else {
      show_button = <LinearProgress mode="indeterminate" />;
    }

    if (this.state.error) {
      show_error = <div>{this.state.error}</div>;
    }

    return  <div className="default__card prediction__evidences">
      <div className="text__title">
        Evidence supporting this Prediction
      </div>
      {not_found}
      {evidences.map((evidence, index) =>
        <InlineLink 
          item={evidence}
          key="prediction-evidence-#{index}"
        />
      )}
      <div>
        <TextField
            value={this.state.evidenceURL}
            hintText="Add Evidence that supports this prediction"
            fullWidth={true}
            onChange={this.changeEvidence}
            />
        {show_button}
        {show_error}
      </div>
    </div>;
  }
}

export default PredictionEvidences;