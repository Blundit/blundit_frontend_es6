import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryExperts from '../components/CategoryExperts';
import CategorySubHead from '../components/CategorySubHead';
import LoadingBlock from '../components/LoadingBlock';

// TODO: Higher order components for the CategoryX.js views?
class CategoryExperts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      category: null
    };
  }


  componentDidMount () {
    this.getCategoryExpertsInfo();
    this.getCategoryInfo();
  }


  getCategoryExpertsInfo () {
    let params = {
      path: "category_experts",
      path_variables: {
        category_id: this.props.id
      },
      success: this.categoryExpertsSuccess,
      error: this.categoryExpertsError
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


  categoryExpertsSuccess (data) {
    this.setState({ data: data });
  }


  categoryExpertsError (error) {}


  categorySuccess (data) {
    this.setState({ category: data });
  }


  categoryError (error) {}


  render () {
    [ content, category, category_data, loading_block ] = null;

    if (!this.state.category || !this.state.data) {
      loading_block = <LoadingBlock text="Category - Showing Experts"></LoadingBlock>;
    }
    if (this.state.category) {
      category = <div className="default__card">
        <div className="text__title">
          {this.state.category.name ? `Category '${this.state.category.name}'` : `Category`}
        </div>
        <div className="text__subtitle">
          Showing Experts
        </div>
        <CategorySubHead category_id={this.props.id}></CategorySubHead>;
      </div>;
    }
    if (this.state.data) {
      const { data } = this.state;
    
      category_data = <div className="categories">
        <CategoryExperts experts={data.experts}></CategoryExperts>
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

export default CategoryExperts;
