import React, { Component } from 'react';
import NotFound from '../shared/NotFound';
import ExpertCard from "../components/ExpertCard";


class CategoryExperts extends Component {
  constructor(props) {
    super(props);
  }


  expertCards = () => {
    if (this.props.experts.length > 0) {
      return this.props.experts.map((expert, index) => 
          <ExpertCard expert={expert} key={`category-expert-${index}`} />
      )
    } else {
      return <NotFound>There are no experts in this category.</NotFound>
    }
  }


  render () {
    return <div className="default__card categories__experts">
      <div className="text__title">
        Experts
      </div>
      {this.expertCards()}
    </div>
  }
}

export default CategoryExpert;
