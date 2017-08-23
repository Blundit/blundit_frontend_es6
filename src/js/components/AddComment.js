import React, { Component } from 'react';
import { 
  TextField, 
  RefreshIndicator, 
  RaisedButton 
} from 'material-ui';


class AddComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { inputs, error, errorText, submitting, addComment } = this.props;
    [show_comment_error, add_comment_button] = null;

    if (errorText != null) {
      show_comment_error = <div>{commentError}</div>;
    }

    if (submitting == true) {
      let style = {
        display: 'inline-block',
        position: 'relative',
        boxShadow: 'none'
      }
      add_comment_button = <RefreshIndicator style={style} size={50} left={0} top={0} status="loading" />
    } else {
      add_comment_button = <RaisedButton label="Add Comment" primary={true} onClick={addComment} />
    }

    return <div className="comments__add-comment">
      <div>
        <TextField
          id="comment-content"
          hintText="Add Comment"
          floatingLabelText="Add Comment"
          multiLine={true}
          rows={1}
          fullWidth={true}
          rowsMax={4}
          value={inputs.content.val}
          onChange={this.changehandleCommentContentChange}
          errorText={errorText}
          />
        {add_comment_button}
        {show_comment_error}
      </div>
    </div>
  }
}

export default AddComment;