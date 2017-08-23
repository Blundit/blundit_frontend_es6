import React, { Component } from 'react';
import InlineLink from "../components/InlineLink";
import {
  LinearProgress,
  TextField,
  FlatButton
} from 'material-ui';

class ExpertBonaFides extends Component {
  constructor(props) {
    super(props);
    thie.state = {
      url: '',
      addBonaFideError: false,
      submittingBonaFide: false
    }
  }

  
  addBonaFide () {
    if (this.state.url === '') {
      this.setState({ addBonaFideError: "Url required" });
      return;
    }

    this.setState({ submittingBonaFide: true });
    let params = {
      path: "add_bona_fide",
      path_variables: {
        expert_id: this.props.expert.id
      },
      data: {
        url: this.state.url
      },
      success: this.addBonaFidesSuccess,
      error: this.addBonaFidesError
    };

    API.c(params);
  }


  addBonaFidesSuccess (data) {
    this.setState({
      url: '',
      submittingBonaFide: false
    });
    
    this.props.refresh();
  }


  addBonaFidesError (error) {
    this.setState({ submittingBonaFide: false });

    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ addBonaFideError: error.responseJSON.errors[0] });
    } else {
      this.setState({ addBonaFideError: "There was an error." });
    }
  }


  changeURL = (event) => {
    this.setState({ url: event.target.value });
  }


  showCredentials = () => {
    const { bona_fides } = this.props.expert;

    if (bona_fides.length == 0) {
      return <NotFound>This expert currently has no credentials</NotFound>
    } else {
      return bona_fides.map((bona_fide, index) => {
        <InlineLink item={bona_fide} key={`expert-bona-fide-${index}`} />
      });
    }
  }


  showSubmitBonaFide = () => {
    if (UserStore.loggedIn()) {
      if (this.state.submittingBonaFide == true) {
        return <LinearProgress mode="indeterminate" />;
      } else {
        return <div className="expert__bona-fide__add">
          <TextField
            value={this.state.url}
            fullWidth={true}
            onChange={this.changeURL}
            id="add-bonafide"
            hintText="Add URL demonstrating that this expert is knowledgable"
            floatingLabelText="Add Credential"
            />
          <FlatButton value="Add" onClick={this.addBonaFide} />
        </div>
      }
    }
  }


  render () {
    let refreshStyle = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    };
    const { bona_fides } = this.props.expert;

    return <div className="default__card">
      <div className="text__title">
        Credentials
      </div>
      <div className="expert__bona-fides">
        {this.showCredentials()}
      </div>
      {this.showSubmitBonaFide()}
    </div>
  }
}

export default ExpertBonaFides;
