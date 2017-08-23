import React, { Component } from 'react';
// TODO: Update this -- and all API calls -- to operate in Redux?

class BookmarkIndicator extends Component {
  constructor(props) {
    super(props);
  }


  updateBookmark () {
    let params;
    if (this.props.bookmark != null) {
      params = {
        path: "remove_bookmark",
        path_variables: {
          bookmark_id: this.props.bookmark.id
        },
        success: this.removeBookmarkSuccess,
        error: this.removeBookmarkError
      };
    } else {
      params = {
        path: "add_bookmark",
        data: {
          id: this.props.id,
          type: this.props.type
        },
        success: this.addBookmarkSuccess,
        error: this.addBookmarkError
      };
    }
    API.c(params);
  }


  removeBookmarkSuccess (data) {
    this.props.updateBookmark(null);
  }


  removeBookmarkError (error) {}


  addBookmarkSuccess (data) {
    this.props.updateBookmark(data.bookmark);
  }


  addBookmarkError (error) {}
  
  render () {
    let icon = <span className="fa fa-bookmark" />

    if (this.props.bookmark == null) {
      icon = <span className="fa fa-bookmark-o" />
    }

    return <div className="bookmark-indicator" onClick={this.updateBookmark} >
      {icon}
    </div>
    
  }
}

export default BookmarkIndicator;
