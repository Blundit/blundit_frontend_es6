import React, { Component } from 'react';

import {
  IconButton,
  FontIcon,
  FlatButton
} from 'material-ui';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      numberOfPages: this.props.numberOfPages,
      maxButtonDistance: 2
    };
  }


  drawBackArrow () {
    if (this.props.page === 1) {
      return;
    }
    return <IconButton 
      onClick={this.previousPage}
      className="pagination__arrow"
      >
      <FontIcon className="fa fa-angle-left" />
    </IconButton>;
  }


  drawNextArrow () {
    if (this.props.page === this.props.numberOfPages) {
      return;
    }
    
    return <IconButton 
      onClick={this.previousPage}
      className="pagination__arrow"
      >
      <FontIcon className="fa fa-angle-right" />
    </IconButton>;
  }

  
  previousPage () {
    this.props.previousPage();
  }


  nextPage () {
    this.props.nextPage();
  }


  specificPage (id) {
    this.props.specificPage(id);
  }


  buttonStyle () {
    return {
      minWidth: "40px"
    };
  }


  drawFirstPage () {
    if (this.props.page <= 3) {
      return;
    }

    let ellipsis = null;

    if (this.props.page >= 5) {
      ellipsis = <div className="pagination__ellipsis">...</div>
    }

    return <div className="pagination__first">
      <FlatButton
        key="page-1"
        label={1}
        style={this.buttonStyle()}
        className="pagination__item"
        primary={true}
        onClick={this.specificPage.bind(this, 1)}
        />
      {ellipsis}
    </div>;
  }


  drawLastPage () {
    if (this.props.page >= this.props.numberOfPages - 2) {
      return;
    }

    let ellipsis = null;

    if (this.props.page <= this.props.numberOfPages - 4) {
      ellipsis = <div className="pagination__ellipsis">...</div>
    }

    return <div className="pagination__last">
      {ellipsis}
      <FlatButton
        key="page-1"
        label={1}
        style={this.buttonStyle()}
        className="pagination__item"
        primary={true}
        onClick={this.specificPage.bind(this, this.props.numberOfPages)}
        />
      {ellipsis}
    </div>
  }


  drawPages () {
    let page, offset;
    let leftPage = this.props.page - 2;
    let rightPage = this.props.page + 2;
    if (this.props.numberOfPages <= 5) {
      leftPage = 1;
      rightPage = this.props.numberOfPages;
    }
    if ( leftPage < 1) {
      offset =  leftPage - 1;
      leftPage += Math.abs(offset);
      rightPage += Math.abs(offset);
    }
    if (rightPage > this.props.numberOfPages) {
      offset = this.props.numberOfPages - rightPage;
      leftPage -= Math.abs(offset);
      rightPage -= Math.abs(offset);
    }
    
    results = [];
    for (let page = leftPage; page <= rightPage; page++) {
      results.push(<FlatButton 
        key={`page-${page}`} 
        label={page} 
        style={this.buttonStyle()} 
        disabled={page == this.props.page? true : false}
        onClick={this.specificPage.bind(this, page)}></FlatButton>);
    }
    return results;
  }


  render () {
    if (this.props.numberOfPages < 2) {
      return <div></div>;

    }
    return <div className="pagination">
      {this.drawBackArrow()}
      {this.drawFirstPage()}
      <div className="pagination__pages">
        {this.drawPages()}
      </div>
      {this.drawLastPage()}
      {this.drawNextArrow()}
    </div>;
  }
}

export default Pagination;
