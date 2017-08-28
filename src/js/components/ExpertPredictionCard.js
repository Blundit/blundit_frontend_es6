import React, { Component } from 'react';
ExpertSubstantiations from "../components/ExpertSubstantiations");

import Links from '../shared/Links';

class ExpertPredictionCard extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      showSubstantiation: false
    }
  }


  showSubstantiation () {
    let prediction;
    prediction = this.props.prediction;
    if (this.state.showSubstantiation === true) {
      return span({
        className: "fa fa-close"
      }, '');
    }
    if (prediction.evidence_of_beliefs === 0) {
      return "Unsubstantiated";
    } else {
      return prediction.evidence_of_beliefs + " substantiations";
    }
  }


  toggleSubstantiation = () => {
    this.setState({ showSubstantiation: !this.state.showSubstantiation });
  }


  render () {
    const { prediction, expert } = this.props;
    let substantiations = null;

    if (this.state.showSubstantiation == true) {
      substantiations = <ExpertSubstantiations
        expert={expert}
        id={prediction.id}
        type="prediction"
        />;
    }

    return <div className="expert__predictions-list-item">
      <div
        className="expert__predictions-list-item__title"
        onClick={goToPrediction.bind(this, prediction.alias)}
        >
        prediction.title
      </div>
      <div
        className="expert__predictions-list-item__substantiations"
        onClick={this.toggleSubstantiation}
        >
        {this.showSubstantiation()}
      </div>
      {substantiations}
    </div>
  }
}

export default ExpertPredictionCard;