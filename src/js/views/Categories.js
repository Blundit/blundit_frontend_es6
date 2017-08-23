import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBlock from '../components/LoadingBlock';
import Links from '../shared/Links';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    };
  }


  componentDidMount () {
    let params = {
      path: "categories",
      success: this.categoryListSuccess,
      error: this.categoryListError
    };
    API.c(params)
  }


  categoryListSuccess = (data) => {
    this.setState({ categories: data });
  }


  categoryListError = (error) => {}


  getCategoryDescription (category) {
    let c = "categories__list__item-description";
    let description = category.description;
    if ((category.description == null) || category.description === "") {
      c += "--not-found";
      description = "Description not found. I'm sure one will be coming soon.";
    }
    return <div className={c}>{description}</div>;
  }


  render () {
    [ categories, no_categories ] = null;

    if (this.state.categories) {
      categories = <div className="default__card categories__list">
        <div className="text__title">
          "Categories"
        </div>
        {this.state.categories.map((category, index) =>
          <div
            className="categories__list__item"
            key={`category-${index}`}
            onClick={Links.goToCategory.bind(this, category.id)}
            >
            <div className="categories__list__item-title">
              {`${category.name} (${category.experts} E, ${category.predictions} P, ${category.claims} C)`}
            </div>
            {this.getCategoryDescription(category)}
          </div>
        )}
      </div>;
    }

    if (!this.state.categories) {
      no_categories = <LoadingBlock title="Categories"></LoadingBlock>;
    }

    return <div>
      <Header></Header>
      <div className="categories-wrapper">
        <div className="categories-content">
          {catgories}
          {no_categories}
        </div>
      </div>
    </div>;
  }
}

export default Categories;