import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  RaisedButton,
  RefreshIndicator
} from 'material-ui';

import ExpertFields from '../components/ExpertFields';

class CreateExpert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expert: {
        name: '',
        email: '',
        description: '',
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: '',
        city: '',
        country: '',
        wikipedia: '',
        occupation: '',
        website: '',
        tag_list: '',
        avatar: '',
        category: ''
      },
      errors: [],
      submitExpertError: null,
      submittingExpert: false
    };
  }


  updateField (id, val) {
    this.expert = this.state.expert;
    this.expert[id] = val;
    return this.setState({ expert: this.expert });
  }


  assembleExpertData () {
    return this.state.expert;
  }


  createExpert () {
    this.setState({ submitExpertError: null });
    if (this.validateInputs()) {
      this.setState({
        submittingExpert: true
      });
      let params = {
        path: "create_expert",
        data: {
          name: this.state.expert.name,
          description: this.state.expert.description,
          twitter: this.state.expert.twitter,
          facebook: this.state.expert.facebook,
          instagram: this.state.expert.instagram,
          youtube: this.state.expert.youtube,
          city: this.state.expert.city,
          country: this.state.expert.country,
          occupation: this.state.expert.occupation,
          website: this.state.expert.website,
          wikipedia: this.state.expert.wikipedia,
          tag_list: this.state.expert.tag_list,
          category: this.state.expert.category
        },
        success: this.createExpertSuccess,
        error: this.createExpertError
      };

      API.c(params)
    }
  }


  createExpertError (error) {
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ submitExpertError: error.responseJSON.errors[0] });
    } else {
      this.setState({ submitExpertError: "There was an error." });
    }

    this.setState({ submittingExpert: false });
  }


  createExpertSuccess (data) {
    this.setState({ submittingExpert: false });
    
    if (data.expert != null) {
      navigate("/experts/" + data.expert.alias + "?created=1");
    }
  }


  validateInputs () {
    this.errors = [];
    if (this.state.expert.name.length < 3) {
      this.errors.push({
        id: "name",
        text: "Name must be at least 3 characters long."
      });
    }
    if (this.state.expert.category === '') {
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
      <div className="experts-wrapper">
        <div className="experts-content">
          <div className="default__card">
            <div className="text__title">
              "Create Expert"
            </div>
            {UserStore.loggedIn() &&
              <div>
                <ExpertFields
                  expert={this.state.expert}
                  errors={this.state.errors}
                  updateField={this.updateField}
                  />

                if (this.state.submittingExpert != true) {
                  <RaisedButton label="Create" onClick={this.createExpert} />
                } else {
                  <RefreshIndicator style={this.style} size={50} left={0} top={0} status="loading" />
                }
                if (this.state.submitExpertError) {
                  <div>
                    {this.state.submitExpertError}
                  </div>
                }
              </div>
            }
            {!UserStore.loggedIn() &&
              <div className="not-found">
                You must be logged in to add an expert to the sytem.
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default CreateExpert;
