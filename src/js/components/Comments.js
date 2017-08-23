import React, { Component } from 'react';

import Paginate from '../shared/Paginate';

import LoadingBlock from "../components/LoadingBlock";
import NotFound from "../shared/NotFound";
import Comment from "../components/Comment";
import AddComment from "../components/AddComment";


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      user: null,
      errors: [],
      commentSubmitting: false,
      commentError: null,
      inputs: {
        content: {
          val: '',
          minLength: 10
        }
      }
    }
  }


  // TODO: UserStore redux
  handleUserChange (data) {
    this.setState({ user: UserStore.get() });
  }


  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
    this.fetchPaginatedData();
  }


  componentWillUnmount () {
    UserStore.unsubscribe(this.handleUserChange);
  }


  fetchPaginatedData (id) {
    if (id == null) {
      id = this.state.page;
    }
    let params = {
      path: this.props.type + "_comments",
      path_variables: {
        expert_id: this.props.id,
        prediction_id: this.props.id,
        claim_id: this.props.id
      },
      data: {
        page: id
      },
      success: this.commentsSuccess,
      error: this.commentsError
    };
    return API.c(params);
  }


  commentsSuccess = (data) => {
    this.setState({
      comments: data.comments,
      page: Number(data.page),
      numberOfPages: data.number_of_pages
    });
    
    this.inputs = this.state.inputs;
    this.inputs.content.val = '';
    
    this.setState({
      inputs: this.inputs
    });
  }


  commentsError (error) {}


  addComment () {
    if (this.validateInputs()) {
      this.setState({
        commentSubmitting: true
      });
      this.setState({
        commentError: null
      });
      let params = {
        path: this.props.type + "_add_comment",
        path_variables: {
          expert_id: this.props.id,
          prediction_id: this.props.id,
          claim_id: this.props.id
        },
        data: {
          content: this.state.inputs.content.val
        },
        success: this.addCommentSuccess,
        error: this.addCommentError
      };
      API.c(params);
    }
  }

  // TODO: Move validation to HOC
  validateInputs () {
    this.errors = [];
    if (this.state.inputs.content.val.length < 3) {
      this.errors.push({
        id: "content",
        text: "Comment must be at least 3 characters long."
      });
    }

    if (this.state.inputs.content.val.length > 1000) {
      this.errors.push({
        id: "content",
        text: "Comment can't be longer than 1000 characters."
      });
    }

    this.setState({ errors: this.errors });
    if (this.errors.length === 0) {
      return true;
    }
    return false;
  }


  addCommentSuccess = () => {
    this.setState({
      commentSubmitting: false,
      page: 1
    });

    this.fetchPaginatedData(1);
  }


  addCommentError = (error) => {
    this.setState({ commentSubmitting: false });

    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ commentError: error.responseJSON.errors[0] });
    } else {
      this.setState({ commentError: "There was an error." });
    }
  }


  // TODO: Can this be in HOC?
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


  handleCommentContentChange = (event) => {
    this.inputs = this.state.inputs;
    this.inputs.content.val = event.target.value;
    return this.setState({ inputs: this.inputs });
  }


  getCommentName () {
    if (this.props.type === "expert") {
      return this.props.item.name;
    } else {
      return this.props.item.title;
    }
  }


  showAddComment = () => {
    const { comments, user, page, numberOfPages, commentError } = this.state;

    if (comments && (user && user.token)) {
      return 
    }
  }


  render () {
    const { comments, user, page, numberOfPages, commentError } = this.state;
    [add_comment, no_comments] = null;

    if (!comments) {
      return <LoadingBlock
        title={`comments about ${this.getCommentName()}`}
        type="short"
        />
    }

    comments = comments.filter(function(obj) {
      return obj.user != null;
    });

    if (comments && (user && user.token)) {
      add_comment = <AddComment
        error={this.state.commentError} 
        change={this.handleCommentContentChange}
        errorText={this.getErrorText("content")}
        submitting={this.state.commentSubmitting}
        addComment={this.addComment}
        />;
    } else {
      add_comment = <div className="comments__add-comment">
        <NotFound>You must be logged in to add a comment.</NotFound>
      </div>
    }

    if (comments.length == 0) {
      no_comments = <NotFound>Currently No Comments</NotFound>;
    }

    // TODO: HOC
    let pagination = null;
    if (comments.length > 0) {
      pagination = <Pagination
        page={page}
        numberOfPages={numberOfPages}
        nextPage={Paginate.nextPage}
        previousPage={Paginate.previousPage}
        specificPage={Paginate.specificPage}
        />
    }

    return <div className="default__card comments">
      <div className="text__title">
        {`Comments about ${this.getCommentName()}`}
      </div>
      {no_comments}
      {comments.map((comment, index) =>
        <Comment comment={comment} />
      )}
      {pagination}
      {add_comment}
    </div>
  }
}

export default Comments;
