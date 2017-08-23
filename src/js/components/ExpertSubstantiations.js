import React, { Component } from 'react';
import InlineLink from "components/InlineLink";

import {
  RefreshIndicator,
  TextField,
  FlatButton 
} from 'material-ui';

class ExpertSubstantiations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      url: '',
      addSubstantiationError: null,
      submitting: false
    };
  }


  componentDidMount () {
    this.fetchSubstantiationData();
  }


  fetchSubstantiationData () {
    let params = {
      path: "get_substantiations",
      path_variables: {
        expert_id: this.props.expert.id
      },
      data: {
        type: this.props.type,
        id: this.props.id
      },
      success: this.substantiationsSuccess,
      error: this.substantiationsError
    };

    API.c(params);
  }


  substantiationsSuccess (data) {
    this.setState({ data: data });
  }


  addSubstantiation () {
    if (this.state.url === '') {
      this.setState({ addSubstantiationError: "Url required" });
      return;
    }
    this.setState({ submitting: true });

    let params = {
      path: "add_substantiation",
      path_variables: {
        expert_id: this.props.expert.id
      },
      data: {
        type: this.props.type,
        id: this.props.id,
        url: this.state.url
      },
      success: this.addSubstantiationsSuccess,
      error: this.addSubstantiationsError
    };

    API.c(params);
  }


  addSubstantiationsSuccess = (data) => {
    this.setState({ url: '' });
    this.fetchSubstantiationData();
    this.setState({ submitting: false });
  }


  addSubstantiationsError = (error) => {
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ addSubstantiationError: error.responseJSON.errors[0] });
    } else {
      this.setState({
        addSubstantiationError: "There was an error.",
        submitting: false
      });
    }
  }


  changeURL = (event) => {
    return this.setState({ url: event.target.value });
  }


  showAddSubstantiation () {
    if (!UserStore.loggedIn()) { return false; }

    let submitting = <LinearProgress mode="indeterminate" />;
    let error = null;

    if (this.state.submitting == false) {
      submitting = <div>
        <TextField
          value={this.state.url}
          fullWidth={true}
          onChange={this.changeURL}
          id="add-substantiation"
          />
        <FlatButton label="Add" onClick={addSubstantiation} />
      </div>;
    }

    if (this.state.addSubstantiationError) {
      submitting = <div>{this.state.addSubstantiationError}</div>;
    }

    return <div className="substantiation-list__add">
      Add Substantiation:
      {submitting}
      {error}
    </div>;
  }


  render () {
    let refreshStyle = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    }
    const { expert, type } = this.props;
    [ no_substantiations ] = null;

    if (this.state.data.length == 0) {
      no_substantiations = `There are currently no links substantianting ${expert.name}'s belief in this ${type}.`;
    }

    if (this.state.data == null) {
      return <RefreshIndicator style={this.refreshStyle} size={50} left={0} top={0} status={"loading"} />
    } else {
      return <div>
        <div className="substantiation-list">
          {this.noSubstantiations()}
          {this.state.data.map((substantiation, index) =>
            <InlineLink item={substantiation} key={`substantiation-list-${this.props.id}-${index}`} />
          )}
        </div>
        {this.showAddSubstantiation()}
      </div>;
    }
  }
}

export default ExpertSubstantiations;
