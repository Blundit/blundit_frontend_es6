import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      showImageEdit: false,
      imageSubmitting: false,
      imageError: null,
      imageSuccess: null
    };
  }


  cancelImage () {
    this.setState({
      showImageEdit: false,
      showImageDelete: false,
      imageSubmitting: true
    });
  }


  showImageDelete () {
    this.setState({
      showImageEdit: false,
      showImageDelete: true,
      imageSubmitting: false
    });
  }


  showImageEdit () {
    this.setState({
      showImageEdit: true,
      showImageDelete: false,
      imageSubmitting: false
    });
  }


  removeImage () {
    let params;
    if (this.props.type === "expert") {
      params = {
        path: "delete_expert_image",
        path_variables: {
          expert_id: this.props.item_id
        },
        success: this.updateImageSuccess,
        error: this.updateImageError
      };
    } else if (this.props.type === "claim") {
      params = {
        path: "delete_claim_image",
        path_variables: {
          claim_id: this.props.item_id
        },
        success: this.updateImageSuccess,
        error: this.updateImageError
      };
    } else if (this.props.type === "prediction") {
      params = {
        path: "delete_prediction_image",
        path_variables: {
          prediction_id: this.props.item_id
        },
        success: this.updateImageSuccess,
        error: this.updateImageError
      };
    }

    API.c(params)
  }


  submitImageEdit () {
    let params;
    let image = document.getElementById("item__image");
    if ((image.files != null) && (image.files[0] != null)) {
      this.setState({
        imageSubmitting: true,
        imageSuccess: null,
        imageError: null
      });
      
      this.formData = new FormData();
      if (this.props.type === "expert") {
        this.formData.append("avatar", image.files[0]);
        params = {
          path: "update_expert_image",
          path_variables: {
            expert_id: this.props.item_id
          },
          data: this.formData,
          success: this.updateImageSuccess,
          error: this.updateImageError
        };
      } else if (this.props.type === "claim") {
        this.formData.append("pic", image.files[0]);
        params = {
          path: "update_claim_image",
          path_variables: {
            claim_id: this.props.item_id
          },
          data: this.formData,
          success: this.updateImageSuccess,
          error: this.updateImageError
        };
      } else if (this.props.type === "prediction") {
        this.formData.append("pic", image.files[0]);
        params = {
          path: "update_prediction_image",
          path_variables: {
            prediction_id: this.props.item_id
          },
          data: this.formData,
          success: this.updateImageSuccess,
          error: this.updateImageError
        };
      }
      API.c(params);
    }
  }


  updateImageSuccess (data) {
    this.setState({
      omageSubmitting: false,
      imageSuccess: this.props.type + " Updated!"
    });
    this.cancelImage();
    this.props.refresh();
  }


  updateImageError (error) {
    this.setState({ imageSubmitting: false });
    if ((error.responseJSON != null) && (error.responseJSON.errors != null)) {
      this.setState({ imageError: error.responseJSON.errors[0] });
    } else {
      return this.setState({ imageError: "There was an error." });
    }
  }


  render() {
    [ image_edit, image_delete ] = null;

    image_submitting = <input
      className="item__image"
      type="file"
      id="item__image"
      accept=".png,.jpeg,.jpg,.gif"
      onChange={this.submitImageEdit}
      />
    if (this.state.imageSubmitting == true) {
      image_submitting = <div className="avatar__chrome__image--submitting">Uploading Image...</div>;
    }

    if (this.state.showImageEdit == true) {
      image_edit = <div className="avatar__chrome__edit">
        {image_submitting}
        <RaisedButton label="Cancel" primary={true} onClick={this.cancelImage} />
      </div>
    }

    if (this.state.showImageDelete == true) {
        image_delete = <div className="avatar__chrome__delete">
          <RaisedButton label="Remove Image" primary={true} onClick={this.removeImage } />
          <RaisedButton label="Cancel" primary={true} onClick={this.cancelImage } />
        </div>;
    }

    return <div className="avatar__chrome">
      <span
        className="avatar__chrome__delete-button"
        onClick={this.showImageDelete}
        >
        <span className="fa fa-close" />
      </span>
      <span
        className="avatar__chrome__edit-button"
        onClick={this.showImageEdit}
        >
        <span className="fa fa-pencil" />
      </span>
      {image_edit}
      {image_delete}
    </div>;
  }
}

export default ImageUpload;