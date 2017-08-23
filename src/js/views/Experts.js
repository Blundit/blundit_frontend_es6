import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  RaisedButton
} from 'material-ui';

import ExpertCard from "../components/ExpertCard";
import Pagination from "../components/Pagination";
import SearchFilters from "../components/SearchFilters";
import LoadingBlock from '../components/LoadingBlock';

import Paginate from '../shared/Paginate';
import Sessions from '../shared/Sessions';
import Links from '../shared/Links';

class Experts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experts: null,
      query: this.getQuery(),
      sort: this.getSort()
    };
  }


  componentWillMount () {
    return this.fetchPaginatedData();
  }


  fetchPaginatedData (id = this.state.page, query = this.state.query, sort = this.state.sort) {
    let params = {
      path: "experts",
      data: {
        page: id,
        query: query,
        sort: sort
      },
      success: this.expertListSuccess,
      error: this.expertListError
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


  expertListSuccess (data) {
    this.setState({
      experts: data.experts,
      page: Number(data.page),
      numberOfPages: data.number_of_pages
    });
  }


  expertListError (error) {}

  
  search (query, sort) {
    this.setState({
      page: 1,
      query: query,
      sort: sort
    });

    window.history.pushState('', 'Blundit - Experts', window.location.origin + "/experts?query=" + query + "&sort=" + sort + "&page=1");
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
      <div className="experts-wrapper">
        <div className="experts-content">
          <SearchFilters
            sortOptions={this.getSortOptions()}
            search={this.search}
            />
          <div className="default__card">
            <RaisedButton label="Create New Expert" primary={true} onClick={this.goToNewExpert} style={this.newItemStyle()} />
          </div>
          {this.state.experts && 
            <div className="default__card">
              <div className="experts__list">
                {this.state.experts.map((expert, index) =>
                  <ExpertCard expert={expert} key={`expert-card-${index}`} />
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
          
          {!this.state.experts &&
            <LoadingBlock
              title="Experts"
              />
          }
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default Experts;