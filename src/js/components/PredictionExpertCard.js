import React, { Component } from 'react';
import ExpertSubstantiations from "../components/ExpertSubstantiations";

import Links from '../shared/Links';
import Avatar from '../shared/Avatar';

class PredictionExpertCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubstantiation: false
    };
  }


  showSubstantiation () {
    const { expert } = this.props;
    
    if (this.state.showSubstantiation === true) {
      return "X";
    }
    
    if (expert.evidence_of_beliefs === 0) {
      return "Unsubstantiated";
    } else {
      return expert.evidence_of_beliefs + " substantiations";
    }
  }


  toggleSubstantiation = () => {
    this.setState({ showSubstantiation: !this.state.showSubstantiation });
  }


  render () {
    const { expert, prediction } = this.props;
    let substantiations = null;

    if (this.state.showSubstantiation == true) {
      substantiations = <ExpertSubstantiations
        expert={expert}
        id={prediction.id}
        type="prediction"
        />;
    }

    return  <div className="prediction__experts-list-item">
      <div
        className="claim__experts-list-item__avatar"
        style={{backgroundImage: `url(${this.getExpertAvatar(expert)})`}}
        />
      <div
        className="prediction__experts-list-item__title"
        onClick={this.goToExpert.bind(this, expert.alias)}
        >
        {expert.name}
      </div>
      <div
        className="prediction__experts-list-item__substantiations"
        onClick={this.toggleSubstantiation}
        >
        {this.showSubstantiation()}
      </div>
      {substantiations}
    </div>
  }
}

export default PredictionExpertCard;