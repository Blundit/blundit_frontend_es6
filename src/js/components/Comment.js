import React, { Component } from 'react';

import Dates from '../shared/Dates';
import Avatar from '../shared/Avatar';

class Comment extends Component {
  render () {
    const { comment } = this.props;

    return <div className="comments__comment" key={`comment-${index}`}>
      <div className="comments__comment__meta">
        <div
          className="comments__comment__meta-user-avatar"
          style={{backgroundImage: `url(${Avatar.getUserAvatar(comment.user)})`}}
          />
        <div className="comments__comment__meta-text">
          <div className="comments__comment__meta-text-username">
            {comment.user.first_name + " " + comment.user.last_name}
          </div>
          <div className="comments__comment__meta-text-created-at">
            {Dates.formatDateAndTime(comment.created_at)}
          </div>
        </div>
      </div>
      <div className="comments__comment-text">
        {comment.content}
      </div>
    </div>
  }
}

export default Comment;