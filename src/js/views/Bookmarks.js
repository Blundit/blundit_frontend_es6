import React, { Component } from 'react';

import Utils from '../shared/Utils';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Bookmark from '../components/Bookmark';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: null,
      user: null
    }
  }

  componentDidMount () {
    return UserStore.subscribe(this.updateUser);
  }


  componentWillUnmount () {
    return UserStore.unsubscribe(this.updateUser);
  }


  updateUser () {
    if (this.state.bookmarks === null) {
      this.fetchBookmarks();
    }
    return this.setState({
      user: UserStore.get()
    });
  }


  fetchBookmarks () {
    let params = {
      path: "bookmarks",
      success: this.getBookmarksSuccess,
      error: this.getBookmarksError
    };
    API.c(params)
  }


  getBookmarksSuccess (data) {
    return this.setState({
      bookmarks: data
    });
  }


  getBookmarksError (error) {}
  

  changeNotificationSettings (bookmark) {
    let notify = !bookmark.notify;
    let params = {
      path: "update_bookmark",
      path_variables: {
        bookmark_id: bookmark.id
      },
      data: {
        notify: notify
      },
      success: this.changeNotificationSuccess,
      error: this.changeNotificationError
    };
    API.c(params);
  }


  changeNotificationSuccess (data) {
    return this.fetchBookmarks();
  }


  changeNotificationError (error) {}


  removeBookmark (bookmark) {
    let params = {
      path: "remove_bookmark",
      path_variables: {
        bookmark_id: bookmark.id
      },
      success: this.removeBookmarkSuccess,
      error: this.removeBookmarkError
    };

    API.c(params);
  }


  removeBookmarkSuccess (data) {
    this.fetchBookmarks();
  }


  removeBookmarkError (error) {}


  showTitle = () => {
    if (this.state.user == null) {
      return <div className="default__card">
        <div classname="text__title">
          My bookmarks
        </div>
        <div className="not-found">
          Loading...
        </div>
      </div>
    }

    if (this.state.user != null && this.state.token == null) {
      return <div className="default__card">
        <div classname="text__title">
          My bookmarks
        </div>
        <div className="not-found">
          You must be logged in to view this content.
        </div>
      </div>
    }    
  }


  showBookmarks = () => {
    let bookmarks = <div></div>

    if (this.state.bookmarks) {
      bookmarks = this.state.bookmarks.map((bookmark, index) => 
        <Bookmark 
          bookmark={bookmark}
          key={`bookmark-${index}`}
          changeNotificationSettings={this.changeNotificationSettings}
          removeBookmark={this.removeBookmark}
          />
      )
    }

    if (this.state.user && this.state.user.token) {
      return <div className="default__card bookmarks__list">
        <div className="text__title">
          My bookmarks
        </div>
        {bookmarks}
      </div>

    }
  }

  
  render() {
    <div>
      <Header />
      <div className="bookmarks-wrapper">
        <div classname="bookmarks-content">
          {this.showTitle()}
          {this.showBookmarks()}
        </div>
      </div>
      <Footer />
    </div>
  }
}