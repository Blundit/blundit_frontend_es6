import React, { Component } from 'react';

class CategorySubHead extends Component {
  constructor(props) {
    super(props);
  }
  

  showAll() {
    navigate("/categories/" + this.props.category_id);
  }


  showExperts() {
    navigate("/categories/" + this.props.category_id + "/experts");
  }


  showClaims() {
    navigate("/categories/" + this.props.category_id + "/claims");
  }


  showPredictions() {
    navigate("/categories/" + this.props.category_id + "/predictions");
  }


  currentPage(id) {
    this.path = window.location.pathname;
    if (id === '') {
      if (this.path.indexOf("/" + this.props.category_id + "/") === -1) {
        return true;
      }
      return false;
    } else {
      if (this.path.indexOf("/" + this.props.category_id + "/" + id) === -1) {
        return false;
      }
      return true;
    }
  }


  goBack  () {
    return navigate("/categories");
  }


  render  () {
    let all = <div className="page-subhead__item" onClick={this.showAll}>All</div>
    let experts = <div className="page-subhead__item" onClick={this.showExperts}>Experts</div>
    let claims = <div className="page-subhead__item" onClick={this.showClaims}>Claims</div>
    let predictions = <div className="page-subhead__item" onClick={this.showPredictions}>Predictions</div>

    if (this.currentPage('')) {
      all = <div className="page-subhead__item--active">All</div>
    }

    if (this.currentPage('experts')) {
      experts = <div className="page-subhead__item--active">Experts</div>
    }

    if (this.currentPage('claims')) {
      claims = <div className="page-subhead__item--active">Claims</div>
    }

    if (this.currentPage('predictions')) {
      predictions = <div className="page-subhead__item--active">Predictions</div>
    }

    return <div className="page-subhead">
      <div className="page-subhead__back" onClick={this.goBack}>{"<<"}</div>
      {all}
      {experts}
      {predictions}
      {claims}
    </div>
  }
}

export default CategorySubHead;
