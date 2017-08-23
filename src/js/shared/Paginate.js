// TODO: Put paginate methods into higher order function
import React, { Component} from 'react';

class Paginate {
  constructor() {
    this.state = {
      page: 1,
      numberOfPages: 1
    }
  }


  nextPage () {
    if (this.state.page < this.state.numberOfPages) {
      this.setState({
        page: this.state.page + 1
      });
    }

    return this.fetchPaginatedData(this.state.page + 1);
  }


  previousPage (ref) {
    if (ref.state.page > 1) {
      ref.setState({
        page: ref.state.page - 1
      });
    }
    return ref.fetchPaginatedData(ref.state.page - 1);
  }


  specificPage (page, ref) {
    this.setState({
      page: page
    });
    ref.fetchPaginatedData(page);
  }
};

export default Paginate;