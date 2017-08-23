import React, { Component } from 'react';
import NotFound from '../shared/NotFound';
import ClaimCard from '../components/ClaimCard';

class CategoryClaims extends Component {
  constructor(props) {
    super(props);
  }


  claimCards = () => {
    if (this.props.claims.length > 0) {
      return this.props.claims.map((claim, index) =>
        <ClaimCard claim={claim} key={`category-claim-${index}`} />
      )
    } else {
      return <NotFound>There are no claims in this category.</NotFound>;
    }
  }


  render () {
    return <div className="default__card categories__claims" >
      <div className="text__title">
        Claims:
      </div>
      {this.claimCards()}
    </div>
  }
}


