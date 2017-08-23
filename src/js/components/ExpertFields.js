import React, { Component } from 'react';

import {
  TextField, 
  MenuItem, 
  SelectField 
} from 'material-ui';

class ExpertFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null
    }
  }


  componentDidMount () {
    let params = {
      path: "categories",
      success: this.categoryListSuccess,
      error: this.categoryListError
    };
    API.c(params);
  }


  categoryListSuccess (data) {
    this.setState({ categories: data });
  }


  categoryListError (error) {}


  updateField = (event) => {
    if ((event == null) || (event.target == null)) {
      return;
    }
    this.props.updateField(event.target.id, event.target.value);
  }


  handleCategoryChange = (event, index, value) => {
    this.props.updateField("category", value);
  }


  // add getErrorText to Utils?
  getErrorText (key) {
    const { errors } = this.props;
    for (let i = 0; i < errors.length; i++) {
      let error = errors[i];
      if (error.id === key) {
        return error.text;
      }
    }
    return null;
  }


  render () {
    if (this.state.categories === null) {
      return <div>Loading...</div>
    } 

    let category_error_text = false;
    if (this.getErrorText("category")) {
      category_error_text = <div>{this.getErrorText("category")}</div>
    }

    return <div>
      <TextField
        id="name"
        hintText="Expert Name"
        floatingLabelText="Name"
        multiLine={false}
        rows={1}
        fullWidth={true}
        value={this.props.expert.name}
        onChange={this.updateField}
        errorText={this.getErrorText("name")}
        />
      <SelectField
        floatingLabelText="Category"
        value={this.props.expert.category}
        onChange={this.handleCategoryChange}
        >
        {this.state.categories.map((item, index) => 
          <MenuItem value={item.id} primaryText={item.name} key={`expert-category-item-${index}`} />
        )}
      </SelectField>
      {category_error_text}
      <TextField
        id="description"
        hintText="Description"
        floatingLabelText="Description"
        multiLine={true}
        fullWidth={true}
        rowsMax={4}
        value={this.props.expert.description}
        onChange={this.updateField}
        errorText={this.getErrorText("description")}
        />
      <TextField
        id="occupation"
        hintText="Occupation"
        floatingLabelText="Occupation"
        fullWidth={true}
        value={this.props.expert.occupation}
        onChange={this.updateField}
        errorText={this.getErrorText("occupation")}
        />
      <TextField
        id="website"
        hintText="Website"
        floatingLabelText="Website"
        fullWidth={true}
        value={this.props.expert.website}
        onChange={this.updateField}
        errorText={this.getErrorText("website")}
        />
      <TextField
        id="city"
        hintText="City"
        floatingLabelText="City"
        fullWidth={true}
        value={this.props.expert.city}
        onChange={this.updateField}
        errorText={this.getErrorText("city")}
        />
      <TextField
        id="country"
        hintText="Country"
        floatingLabelText="Country"
        fullWidth={true}
        value={this.props.expert.country}
        onChange={this.updateField}
        errorText={this.getErrorText("country")}
        />
      <TextField
        id="email"
        hintText="Email"
        floatingLabelText="Email"
        fullWidth={true}
        value={this.props.expert.email}
        onChange={this.updateField}
        errorText={this.getErrorText("email")}
        />
      <TextField
        id="twitter"
        hintText="Twitter Handle"
        floatingLabelText="Twitter Handle"
        value={this.props.expert.twitter}
        onChange={this.updateField}
        errorText={this.getErrorText("twitter")}
        />
      <TextField
        id="facebook"
        hintText="Facebook"
        floatingLabelText="Facebook"
        value={this.props.expert.facebook}
        onChange={this.updateField}
        errorText={this.getErrorText("facebook")}
        />
      <TextField
        id="instagram"
        hintText="Instagram Handle"
        floatingLabelText="Instagram"
        value={this.props.expert.instagram}
        onChange={this.updateField}
        errorText={this.getErrorText("instagram")}
        />
      <TextField
        id="youtube"
        hintText="Youtube"
        floatingLabelText="Youtube"
        value={this.props.expert.youtube}
        onChange={this.updateField}
        errorText={this.getErrorText("youtube")}
        />
      <TextField
        id="wikipedia"
        hintText="Wikipedia"
        floatingLabelText="Wikipedia"
        fullWidth={true}
        value={this.props.expert.wikipedia}
        onChange={this.updateField}
        errorText={this.getErrorText("wikipedia")}
        />
      <TextField
        id="tag_list"
        hintText="Tags"
        floatingLabelText="Tags"
        value={this.props.expert.tag_list}
        onChange={this.updateField}
        errorText={this.getErrorText("tag_list")}
        />
      Avatar Goes Here
    </div>
  }
}

export default ExpertFields;
