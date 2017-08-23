let Footer, Header, LoadingBlock, Pagination, PredictionCard, SearchFilters, div;

import React, { Component } from 'react';

import Header from '../components/Header';

import Footer from '../components/Footer';

PredictionCard = require("components/PredictionCard");

Pagination = require("components/Pagination");

SearchFilters = require("components/SearchFilters");

import LoadingBlock from '../components/LoadingBlock';

import Paginate from '../shared/Paginate';
import Sessions from '../shared/Sessions';
import Links from '../shared/Links';

module.exports = React.createFactory(React.createClass({
  getInitialState () {
    return {
      predictions: null,
      query: this.getQuery(),
      sort: this.getSort()
    };
  },
  componentWillMount () {
    return this.fetchPaginatedData();
  },
  fetchPaginatedData (id = this.state.page, query = this.state.query, sort = this.state.sort) {
    let params = {
      path: "predictions",
      data: {
        page: id,
        query: query,
        sort: sort
      },
      success: this.predictionListSuccess,
      error: this.predictionListError
    };

    API.c(params);
  }

  
  getQuery () {
    if (Sessions.getURLParameter("query")) {
      return Sessions.getURLParameter("query");
    }
    return '';
  },
  getSort () {
    if (Sessions.getURLParameter("sort")) {
      return Number(Sessions.getURLParameter("sort"));
    }
    return 0;
  },
  search (query, sort) {
    this.setState({
      page: 1
    });
    this.setState({
      query: query
    });
    this.setState({
      sort: sort
    });
    window.history.pushState('', 'Blundit - Predictions', window.location.origin + "/predictions?query=" + query + "&sort=" + sort + "&page=1");
    return this.fetchPaginatedData(1, query, sort);
  },
  predictionListSuccess (data) {
    this.setState({
      predictions: data.predictions
    });
    this.setState({
      page: Number(data.page)
    });
    return this.setState({
      numberOfPages: data.number_of_pages
    });
  },
  predictionListError (error) {},
  
  getSortOptions () {
    return [
      {
        id: 0,
        title: "Newest"
      }, {
        id: 1,
        title: "Oldest"
      }, {
        id: 2,
        title: "Most Recently Updated"
      }, {
        id: 3,
        title: "Least Recently Updated"
      }, {
        id: 4,
        title: "Most Accurate"
      }, {
        id: 5,
        title: "Least Accurate"
      }
    ];
  },
  newItemStyle () {
    return {
      width: "100%"
    };
  },
  render () {
    return div({}, Header({}, ''), div({
      className: "predictions-wrapper"
    }, div({
      className: "predictions-content"
    }, SearchFilters({
      sortOptions: this.getSortOptions(),
      search: this.search
    }), div({
      className: "default__card"
    }, React.createElement(Material.RaisedButton, {
      label: "Create New Prediction",
      primary: true,
      onClick: Links.newPrediction,
      style: this.newItemStyle()
    })), this.state.predictions != null ? div({
      className: "default__card"
    }, div({
      className: "predictions__list"
    }, this.state.predictions.map(function(prediction, index) {
      return PredictionCard({
        prediction: prediction,
        key: "prediction-card-" + index
      });
    })), Pagination({
      page: this.state.page,
      numberOfPages: this.state.numberOfPages,
      nextPage: Paginate.nextPage,
      previousPage: this.previousPage,
      specificPage: this.specificPage
    })) : LoadingBlock({
      title: "Predictions"
    }))), Footer({}, ''));
  }
}));
