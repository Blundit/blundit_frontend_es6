let ClaimCard, ExpertCard, Footer, Header, LoadingBlock, PredictionCard, SearchFilters, div;

import React, { Component } from 'react';

import Header from '../components/Header';

import Footer from '../components/Footer';

ClaimCard = require("components/ClaimCard");

PredictionCard = require("components/PredictionCard");

ExpertCard = require("components/ExpertCard");

SearchFilters = require("components/SearchFilters");

import LoadingBlock from '../components/LoadingBlock';

import Sessions from '../shared/Sessions';

module.exports = React.createFactory(React.createClass({
  getInitialState () {
    return {
      data: null,
      query: this.getQuery(),
      sort: this.getSort(),
      searchError: null
    };
  },
  componentDidMount () {
    return this.search(this.state.query, this.state.sort);
  },
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
      }
    ];
  },
  search (query, sort) {
    this.setState({
      data: null
    });
    window.history.pushState('', 'Blundit - Search', window.location.origin + "/search?query=" + query + "&sort=" + sort);
    let params = {
      path: "search",
      data: {
        query: query,
        sort: sort
      },
      success: this.searchSuccess,
      error: this.searchError
    };
    API.call(params);
    this.setState({
      query: query
    });
    return this.setState({
      sort: sort
    });
  },
  searchSuccess (data) {
    this.setState({
      searching: false
    });
    this.setState({
      searchError: null
    });
    return this.setState({
      data: data
    });
  },
  searchError (error) {
    this.setState({
      searching: false
    });
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      return this.setState({
        searchError: error.responseJSON.errors[0]
      });
    } else {
      return this.setState({
        searchError: 'There was an error searching.'
      });
    }
  },
  goToClaims () {
    this.url = "/claims?query=" + this.state.query + "&sort=" + this.state.sort + "&from_search=1";
    return navigate(this.url);
  },
  goToPredictions () {
    this.url = "/predictions?query=" + this.state.query + "&sort=" + this.state.sort + "&from_search=1";
    return navigate(this.url);
  },
  goToExperts () {
    this.url = "/experts?query=" + this.state.query + "&sort=" + this.state.sort + "&from_search=1";
    return navigate(this.url);
  },
  render () {
    return div({}, Header({}, ''), div({
      className: "search-wrapper"
    }, div({
      className: "search-content"
    }, SearchFilters({
      sortOptions: this.getSortOptions(),
      search: this.search
    }), this.state.searching === true ? (this.style = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    }, div({
      className: "default__card"
    }, React.createElement(Material.RefreshIndicator, {
      style: this.style,
      size: 50,
      left: 0,
      top: 0,
      status: "loading"
    }))) : void 0, this.state.data != null ? div({
      className: ""
    }, div({
      className: "default__card search__experts"
    }, div({
      className: "text__title"
    }, "Experts:"), this.state.data.experts.length === 0 ? div({
      className: "search__experts-items--empty"
    }, "No expert found for '" + this.state.data.query + "'") : div({}, div({
      className: "search__experts-items"
    }, this.state.data.experts.map(function(expert, index) {
      return ExpertCard({
        expert: expert,
        key: "search-expert-card-" + index
      });
    })), div({}, React.createElement(Material.RaisedButton, {
      label: "View All",
      primary: true,
      onClick: this.goToExperts
    })))), div({
      className: "default__card search__predictions"
    }, div({
      className: "text__title"
    }, "Predictions:"), this.state.data.predictions.length === 0 ? div({
      className: "search__predictions-items--empty"
    }, "No prediction found for '" + this.state.data.query + "'") : div({}, div({
      className: "search__predictions-items"
    }, this.state.data.predictions.map(function(prediction, index) {
      return PredictionCard({
        prediction: prediction,
        key: "search-prediction-card-" + index
      });
    })), div({}, React.createElement(Material.RaisedButton, {
      label: "View All",
      primary: true,
      onClick: this.goToPredictions
    })))), div({
      className: "default__card search__claims"
    }, div({
      className: "text__title"
    }, "Claims:"), this.state.data.claims.length === 0 ? div({
      className: "search__claims-items--empty"
    }, "No claim found for '" + this.state.data.query + "'") : div({}, div({
      className: "search__claims-items"
    }, this.state.data.claims.map(function(claim, index) {
      return ClaimCard({
        claim: claim,
        key: "search-claim-card-" + index
      });
    })), div({}, React.createElement(Material.RaisedButton, {
      label: "View All",
      primary: true,
      onClick: this.goToClaims
    }))))) : void 0, this.state.data == null ? LoadingBlock({
      title: "Search"
    }) : void 0, this.state.searchError != null ? div({
      className: "default__card search__error"
    }, this.state.searchError) : void 0)), Footer({}, ''));
  }
}));
