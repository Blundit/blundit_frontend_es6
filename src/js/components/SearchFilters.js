import React, { Component } from 'react';

import Sessions from '../shared/Sessions';
import Links from '../shared/Links';

import {
  TextField,
  SelectField,
  MenuItem,
  RaisedButton
} from 'material-ui';

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOptions: this.getSortOptions(),
      inputs: {
        sort: {
          val: this.getSortValue()
        },
        search: {
          val: this.getSearchQuery()
        }
      },
      errors: [],
      searchError: false
    };
  }


  getSortOptions () {
    if (!this.props.sortOptions) {
      return [];
    }
    return this.props.sortOptions;
  }


  getSortValue () {
    if (Sessions.getURLParameter("sort")) {
      return Number(Sessions.getURLParameter("sort"));
    }
    return 0;
  }


  getSearchQuery () {
    if (Sessions.getURLParameter("query")) {
      return Sessions.getURLParameter("query");
    }
    return '';
  }


  handleSearchChange = (event) => {
    this.inputs = this.state.inputs;
    this.inputs.search.val = event.target.value;
    return this.setState({ inputs: this.inputs });
  }


  getErrorText (key) {
    const { errors } = this.state;
    for (let i = 0; i < errors.length; i++) {
      let error = errors[i];
      if (error.id === key) {
        return error.text;
      }
    }
    return null;
  }

  search () {
    this.props.search(this.state.inputs.search.val, this.state.inputs.sort.val);
  }


  handleChange = (event, index, value) => {
    this.inputs = this.state.inputs;
    this.inputs.sort.val = value;
    return this.setState({ inputs: this.inputs });
  }


  render () {
    [ from_search, sort_options ] = null;

    if (Sessions.getURLParameter("from_search")) {
      from_search = <div
        className="predictions__back-to-search"
        onClick={this.goBackToSearch}
        >
        Back to Search
      </div>
    }

    if (this.state.sortOptions.length > 0) {
        sort_options = <SelectField
          floatingLabelText="Sort"
          value={this.state.inputs.sort.val}
          onChange={this.handleChange }
          >
          {this.state.sortOptions.map((item, index) =>
            <MenuItem 
              value={item.id}
              primaryText={item.title} 
              key="search-filter-item-#{index}"
              />
          )}
        </SelectField>
      }

    return <div className="default__card sarch__filter">
      {from_search}
      <TextField
        id="search-field"
        hintText="Enter text to search for"
        floatingLabelText="Search"
        fullWidth={true}
        value={this.state.inputs.search.val}
        onChange={this.handleSearchChange}
        errorText={this.getErrorText("search")}
        />
      {sort_options}
      <RaisedButton
        label="Search"
        onClick={this.search}
        />
    </div>

  }
}

export default SearchFilters;
