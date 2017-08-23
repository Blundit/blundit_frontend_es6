import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ClaimCard from "../components/ClaimCard";
import Pagination from "../components/Pagination";
import SearchFilters from "../components/SearchFilters";
import LoadingBlock from '../components/LoadingBlock';

import {
  RaisedButton
} from 'material-ui';

import Paginate from '../shared/Paginate';
import Sessions from '../shared/Sessions';
import Links from '../shared/Links';

class Claims extends Component {
  constructor(props) {
    this.state = {
      claims: null,
      query: this.getQuery(),
      sort: this.getSort()
    };
  }


  componentWillMount () {
    return this.fetchPaginatedData();
  }


  fetchPaginatedData (id = this.state.page, query = this.state.query, sort = this.state.sort) {
    let params = {
      path: "claims",
      data: {
        page: id,
        query: query,
        sort: sort
      },
      success: this.claimListSuccess,
      error: this.claimListError
    };

    API.c(params)
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


  claimListSuccess (data) {
    this.setState({
      claims: data.claims,
      page: Number(data.page),
      numberOfPages: data.number_of_pages
    });
  }


  claimListError (error) {}
  
  
  search (query, sort) {
    this.setState({
      page: 1,
      query: query,
      sort: sort
    });
    window.history.pushState('', 'Blundit - Claims', window.location.origin + "/claims?query=" + query + "&sort=" + sort + "&page=1");
    this.fetchPaginatedData(1, query, sort);
  }


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
  }


  newItemStyle () {
    return {
      width: "100%"
    };
  }


  render () {
    return <div>
      <Header />
      <div className="claims-wrapper">
        <div className="claims-content">
          <SearchFilters
            sortOptions={this.getSortOptions()}
            search={this.search}
            />
          <div className="default__card">
            <RaisedButton
              label="Create New Claim"
              primary={true}
              onClick={this.goToNewClaim}
              style={this.newItemStyle()}
              />
          </div>
          {this.state.claims &&
            <div className="default__card">
              <div className="claims__list">
                {this.state.claims.map((claim, index) =>
                  <ClaimCard claim={claim} key={`claim-card-#{index}`} />
                )}
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
          {!this.state.claims &&
            <LoadingBlock title="Claims" />
          }
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default Claims;