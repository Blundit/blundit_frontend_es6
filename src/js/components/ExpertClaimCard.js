import React, { Component } from 'react';
import ExpertSubstantiations from "../components/ExpertSubstantiations");
import Links from '../shared/Links';

class ExpertClaimCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSubstantiation: false
    }
  }


  showSubstantiation () {
    const { claim } = this.props;

    if (this.state.showSubstantiation === true) {
      return <span className="fa fa-close"></span>;
    }

    if (claim.evidence_of_beliefs === 0) {
      return "Unsubstantiated";
    } else {
      return claim.evidence_of_beliefs + " substantiations";
    }
  }


  toggleSubstantiation = () => {
    this.setState({ showSubstantiation: !this.state.showSubstantiation });
  }


  render () {
    const { claim } = this.props;
    let substantiations = null;

    if (this.state.showSubstantiation == true) {
      substantiations = <ExpertSubstantiations
          expert={this.props.expert}
          id={this.claim.id}
          type="claim" />
    }

    <div className="expert__claims-list-item">
      <div
        className="expert__claims-list-item__title"
        onClick={this.goToClaim.bind(this, claim.alias)}
        >
        {claim.title}
      </div>
      <div
        className="expert__claims-list-item__substantiations"
        onClick={this.toggleSubstantiation}
        >
        {this.showSubstantiation()}
      </div>
      {substantiations}
    </div>;
  }
}

export default ExpertClaimCard;
