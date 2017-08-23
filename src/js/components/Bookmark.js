import React, { Component } from 'react';
import Utils from '../shared/Utils';

class Bookmark extends Component {
  getClass (bookmark) {
    let className = "bookmarks__list__item";
    
    if (bookmark.new === true) {
      className += "--has-new";
    }

    return className;
  }


  showBookmarkNewStatus (bookmark) {
    if (bookmark.new === true) {
      return <span className="fa fa-asterisk" />
    }
  }


  showNotificationSettings (bookmark) {
    if (bookmark.notify === true) {
      return <span className="fa fa-envelope"/>
    } else {
      return <span className="fa fa-envelope0o"/>
    }
  }


  goToBookmarkItem (bookmark) {
    return navigate("/" + bookmark.type + "s/" + bookmark.alias);
  }

  
  render() {
    const { bookmark } = this.props;

    return <div className={this.getClass(bookmark)} >
      <div className="bookmarks__list__item-row">
        <div className="bookmarks__list__item-type">
          {Utils.sentenceCase(bookmark.type) + ": "}
        </div>
        <div 
          className="bookmarks__list__item-title"
          onClick={this.goToBookmarkItem.bind(this, bookmark)}
          >
            {bookmark.title}
        </div>
        <div className="bookmarks__list__item-new">
          {this.showBookmarkNewStatus(bookmark)}
        </div>
      </div>
      <div className="bookmarks__list__item-row">
        <div 
          className="bookmarks__list__item-notify"
          onClick={this.props.changeNotificationSettings.bind(this, bookmark)}
          >
            Notify of Updates:
            {this.showNotificationSettings(bookmark)}
        </div>
        <div
          className="bookmarks__list__item-remove"
          onClick={this.props.removeBookmark.bind(this, bookmark)}>
          <span className="fa fa-remove" />
        </div>
      </div>
    </div>
  }
}