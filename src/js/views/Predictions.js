import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PredictionCard from "../components/PredictionCard";
import Pagination from "../components/Pagination";
import SearchFilters from "../components/SearchFilters";
import LoadingBlock from '../components/LoadingBlock';

import {
  RaisedButton
} from 'material-ui';

import Paginate from '../shared/Paginate';
import Sessions from '../shared/Sessions';
import Links from '../shared/Links';

class Predictions extends Component {
  constructor(props) {
    this.state = {
      predictions: null,
      query: this.getQuery(),
      sort: this.getSort()
    };
  }


  componentWillMount () {
    this.fetchPaginatedData();
  }


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
  }


  getSort () {
    if (Sessions.getURLParameter("sort")) {
      return Number(Sessions.getURLParameter("sort"));
    }
    return 0;
  }


  search (query, sort) {
    this.setState({
      page: 1,
      query: query,
      sort: sort
    });
    window.history.pushState('', 'Blundit - Predictions', window.location.origin + "/predictions?query=" + query + "&sort=" + sort + "&page=1");
    this.fetchPaginatedData(1, query, sort);
  }


  predictionListSuccess (data) {
    this.setState({
      predictions: data.predictions,
      page: Number(data.page),
      numberOfPages: data.number_of_pages
    });
  }


  predictionListError (error) {}

  
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
  }


  newItemStyle () {
    return {
      width: "100%"
    };
  }


  render () {
    return <div>
      <Header />
      <div className="predictions-wrapper">
        <div className="predictions-content">
          <SearchFilters
            sortOptions={this.getSortOptions()}
            search={this.search}
            />
          <div className="default__card">
            <RaisedButton
              label="Create New Prediction"
              primary={true}
              onClick={this.goToNewPrediction}
              style={this.newItemStyle() }
              />
          </div>
          {this.state.predictions &&
            <div className="default__card">
              <div className="predictions__list">
                @state.predictions.map (prediction, index) ->
                  PredictionCard
                    prediction: prediction
                    key: "prediction-card-#{index}"
              </div>
              <Pagination
                page={this.state.page}
                numberOfPages={this.state.numberOfPages}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                specificPage={this.specificPage}
                />
            </div>
          }
          {!this.state.predictions &&
            <LoadingBlock title="Predictions" />
          }
        </div>
      </div>
      <Footer />
    </div>

  }
}

export default Predictions;