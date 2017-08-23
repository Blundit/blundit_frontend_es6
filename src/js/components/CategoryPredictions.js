import React, { Component } from 'react';
import NotFound from '../shared/NotFound';
import PredictionCard from '../components/PredictionCard';

class CategoryPredictions extends Component {
  constructor(props) {
    super(props);
  }


  predictionCards = () => {
    if (this.props.predictions.length > 0) {
      return this.props.predictions.map((expert, index) => 
          <PredictionCard prediction={prediction} key={`category-prediction-${index}`} />
      )
    } else {
      return <NotFound>There are no predictions in this category.</NotFound>
    }
  }


  render () {
    return <div className="default__card categories__predictions">
      <div className="text__title">
        Predictions
      </div>
      {this.predictionCards()}
    </div>
  }
}

export default CategoryPredictions;