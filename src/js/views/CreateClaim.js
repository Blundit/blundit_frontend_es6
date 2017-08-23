import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  RaisedButton,
  RefreshIndicator
} from 'material-ui';

import ClaimFields from '../components/ClaimFields';

class CreateClaim extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      claim: {
        title: '',
        description: '',
        url: '',
        pic: '',
        category: ''
      },
      errors: [],
      submitClaimError: null,
      submittingClaim: false
    };
  }


  updateField (id, val) {
    this.claim = this.state.claim;
    this.claim[id] = val;
    return this.setState({ claim: this.claim });
  }


  assembleClaimData () {
    return this.state.claim;
  }


  createClaim () {
    this.setState({ submitClaimError: null });

    if (this.validateInputs()) {
      this.setState({ submittingClaim: true });
      let params = {
        path: "create_claim",
        data: {
          title: this.state.claim.title,
          description: this.state.claim.description,
          url: this.state.claim.url,
          category: this.state.claim.category
        },
        success: this.createClaimSuccess,
        error: this.createClaimError
      };

      API.c(params)
    }
  }


  createClaimError (error) {
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ submitClaimError: error.responseJSON.errors[0] });
    } else {
      this.setState({ submitClaimError: "There was an error." });
    }
    
    this.setState({ submittingClaim: false });
  }


  createClaimSuccess (data) {
    this.setState({ submittingClaim: false });
    if (data.claim != null) {
      navigate("/claims/" + data.claim.alias + "?created=1");
    }
  }


  validateInputs () {
    this.errors = [];
    if (this.state.claim.title.length < 3) {
      this.errors.push({
        id: "title",
        text: "Title must be at least 3 characters long."
      });
    }
    if (this.state.claim.category === '') {
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
      boxShadow: 'none',
    }
    return <div>
      <Header />
      <div className="claims-wrapper">
        <div className="claims-content">
          <div className="default__card">
            <div className="text__title">
              Create Claim
            </div>
            {UserStore.loggedIn() && 
              <div>
                <ClaimFields
                  claim={this.state.claim}
                  errors={this.state.errors}
                  updateField={this.updateField}
                  />

                if (this.state.submittingClaim != true) {
                  <RaisedButton label="Create" onClick={this.createClaim } />
                } else {
                  <RefreshIndicator style={this.style} size={50} left={0} top={0} status="loading" />
                }
                if (this.state.submitClaimError) {
                  <div>
                    @state.submitClaimError
                  </div>
                }
              </div>
            }
            {!UserStore.loggedIn() && 
              <div className="not-found">
                You must be logged in to add an claim to the sytem.
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default CreateClaim;