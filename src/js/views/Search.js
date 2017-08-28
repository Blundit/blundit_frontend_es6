import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import ClaimCard from "../components/ClaimCard";
import PredictionCard from "../components/PredictionCard";
import ExpertCard from "../components/ExpertCard";
import SearchFilters from "../components/SearchFilters");
import LoadingBlock from '../components/LoadingBlock';
import Sessions from '../shared/Sessions';

import {
  RefreshIndicator,
  RaisedButton
} from 'material-ui';

import {
  RefreshIndicator,
  RaisedButton
} from 'material-ui';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      query: this.getQuery(),
      sort: this.getSort(),
      searchError: null
    };
  }

  componentDidMount () {
    this.search(this.state.query, this.state.sort);
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


  search (query, sort) {
    this.setState({
      data: null,
      query: query,
      sort: sort
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
  }


  searchSuccess (data) {
    this.setState({
      searching: false,
      searchError: null,
      data: data
    });
  }


  searchError (error) {
    this.setState({ searching: false });
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ searchError: error.responseJSON.errors[0] });
    } else {
      this.setState({ searchError: 'There was an error searching.' });
    }
  }


  goToClaims () {
    this.url = "/claims?query=" + this.state.query + "&sort=" + this.state.sort + "&from_search=1";
    navigate(this.url);
  }

  goToPredictions () {
    this.url = "/predictions?query=" + this.state.query + "&sort=" + this.state.sort + "&from_search=1";
    navigate(this.url);
  }


  goToExperts () {
    this.url = "/experts?query=" + this.state.query + "&sort=" + this.state.sort + "&from_search=1";
    navigate(this.url);
  }


  render () {
    let style = {
      display: 'inline-block',
      position: 'relative',
      boxShadow: 'none'
    }
    return <div>
      <Header />
      <div className="search-wrapper">
        <div className="search-content">
          <SearchFilters
            sortOptions={this.getSortOptions()}
            search={this.search}
            />
          {this.state.searching == true &&
            <div className="default__card">
              <RefreshIndicator style={style} size={50} left={0} top={0} status="loading" />
            </div>
          }
          {this.state.data &&
            <div className="">
              <div className="default__card search__experts">
                <div className="text__title">
                  Experts:
                </div>
                {this.state.data.experts.length == 0 &&
                  <div className="search__experts-items--empty" >
                    {`No expert found for '${this.state.data.query}'`}
                  </div>
                }
                {this.state.data.experts.length > 0 &&
                  <div>
                    <div className="search__experts-items" >
                      {this.state.data.experts.map((expert, index) =>
                        <ExpertCard expert={expert} key={`search-expert-card-${index}`} />
                      )}
                    </div>
                    <div>
                      <RaisedButton label="View All" primary={true} onClick={this.goToExperts } />
                    </div>
                  </div>
                }
              </div>
              <div className="default__card search__predictions">
                <div className="text__title">
                  Predictions:
                </div>
                {this.state.data.predictions.length == 0 &&
                  <div className="search__predictions-items--empty">
                    {`No prediction found for '${this.state.data.query}'`}
                  </div>
                }
                {this.state.data.predictions.length > 0 &&
                  <div>
                    <div className="search__predictions-items">
                      {this.state.data.predictions.map((prediction, index) =>
                        <PredictionCard
                          prediction={prediction}
                          key={`search-prediction-card-${index}`}
                          />
                      )}
                    </div>
                    <div>
                      <RaisedButton label="View All" primary={true} onClick={this.goToPredictions } />
                    </div>
                  </div>
                }
              </div>
              <div className="default__card search__claims">
                <div className="text__title">
                  Claims:
                </div>
                {this.state.data.claims.length == 0 &&
                  <div className="search__claims-items--empty">
                    {`No claim found for '${this.state.data.query}'`}
                  </div>
                }
                {this.state.data.claims.length > 0 &&
                  <div>
                    <div className="search__claims-items">
                      {this.state.data.claims.map((claim, index) =>
                        <ClaimCard
                          claim={claim}
                          key={`search-claim-card-${index}`}
                          />
                      )}
                    </div>
                    <div>
                      <RaisedButton label="View All" primary={true} onClick={this.goToClaims } />
                    </div>
                  </div>
                }
              </div>
            </div>
          }
          {!this.state.data &&
            <LoadingBlock title="Search" />
          }
          {this.state.searchError &&
            <div className="default__card search__error">
              {this.state.searchError}
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default Search;