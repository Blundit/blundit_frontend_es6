import React, { Component } from 'react';
import InlineLink from "../components/InlineLink";
import NotFound from "../shared/NotFound";

import { 
  TextField, 
  FlatButton, 
  LinearProgress
} from 'material-ui';

class ClaimEvidence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      evidenceURL: '',
      submitting: false,
      error: false
    }
  }
  

  addItem () {
    if (this.state.evidenceUrl == '') {
      this.setState({ error: 'URL Required' });
      return false;
    }

    this.setState({
      submitting: true,
      error: null
    });

    let params = {
      path: "add_evidence_to_claim",
      path_variables: {
        claim_id: this.props.claim.id
      },
      data: {
        url: this.state.evidenceURL
      },
      success: this.addSuccess,
      error: this.addError
    };
    return API.c(params);
  }


  addSuccess = (data) => {
    this.setState({
      evidenceURL: '',
      submitting: false
    });
    this.props.refresh();
  }


  addError = (error) => {
    this.setState({
      error: "Error adding Evidence",
      submitting: false
    });
  }


  handleChange = (event, index, value) => {
    this.setState({ item: value });
  }


  cancelAddItem () {
    this.setState({
      item: null, 
      showItems: false
    });
  }


  changeEvidence (event) {
    this.setState({ evidenceURL: event.target.value });
  }


  showError = () => {
    if (this.state.error != null) {
      return <div>{this.state.error}</div>
    }
  }


  render () {
    let notFound = null;
    if (this.props.evidences.length == 0) {
      notFound = <NotFound>No supporting evidence has been added yet to this claim.</NotFound>
    }

    return <div className="default__card claim__evidences">
      <div className="text__title">
        Evidence Supporting this Claim
      </div>
      {notFound}
      {this.props.evidences.map((evidence, index) =>
        <InlineLink item={evidence} key={`claim-evidence-${index}`} />
      )}
      <div>
        <TextField
          value={this.state.evidenceURL}
          hintText="Add Evidence that supports this claim"
          fullWidth={true}
          onChange={this.changeEvidence} />
        {this.state.submitting == false ? <FlatButton label="Add" onClick={this.addItem} /> : <LinearProgress mode="indeterminate" />}
        {this.showError()}
      </div>
    </div>
  }
}

export default ClaimEvidences;
