import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryExperts from '../components/CategoryExperts';
import CategoryClaims from '../components/CategoryClaims';
import CategoryPredictions from '../components/CategoryPredictions';
import CategorySubHead from '../components/CategorySubHead';
import LoadingBlock from '../components/LoadingBlock';

class CategoryAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      category: null
    };
  }


  componentDidMount () {
    this.getCategoryAllInfo();
    this.getCategoryInfo();
  }


  getCategoryAllInfo () {
    let params = {
      path: "category_all",
      path_variables: {
        category_id: this.props.id
      },
      success: this.categoryAllSuccess,
      error: this.categoryAllError
    };

    API.c(params)
  }


  getCategoryInfo () {
    let params = {
      path: "category",
      path_variables: {
        category_id: this.props.id
      },
      success: this.categorySuccess,
      error: this.categoryError
    };

    API.c(params)
  }


  categoryAllSuccess (data) {
    this.setState({ data: data });
  }


  categoryAllError (error) {}


  categorySuccess (data) {
    this.setState({ category: data });
  }


  categoryError (error) {}


  render () {
    [ content, category, category_data, loading_block ] = null;

    if (!this.state.category || !this.state.data) {
      loading_block = <LoadingBlock text="Category - Showing Experts, Claims and Predictions"></LoadingBlock>;
    }
    if (this.state.category) {
      category = <div className="default__card">
        <div className="text__title">
          {this.state.category.name ? `Category '${this.state.category.name}'` : `Category`}
        </div>
        <div className="text__subtitle">
          Showing Experts, Claims and Predictions
        </div>
        <CategorySubHead category_id={this.props.id}></CategorySubHead>;
      </div>;
    }
    if (this.state.data) {
      const { data } = this.state;
    
      category_data = <div className="categories">
        <CategoryExperts experts={data.experts}></CategoryExperts>
        <CategoryPredictions predictions={data.predictions}></CategoryPredictions>
        <CategoryClaims claims={data.claims}></CategoryClaims>
      </div>;
    }

    return <div>
      <Header></Header>
      <div className="categories-wrapper">
        <div className="categories-content">
          {loading_block}
          <div>
            {category}
            {category_data}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>;
  }
}

export default CategoryAll;
