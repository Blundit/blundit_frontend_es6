import React, { Component } from 'react';

import {
  TextField,
  MenuItem,
  SelectField 
} from 'material-ui';

class ClaimFields extends Component {
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


  showCategoryError = () => {
    if (this.getErrorText("category")) {
      return <div>{this.getErrorText("category")}</div>;
    }
  }


  render () {
    if (this.state.categories === null) {
      return <div>Loading...</div>
    }

    const { claim } = this.props;

    return <div>
      <TextField
        id="title"
        hintText="Claim Title"
        floatingLabelText="Title"
        multiLine={false}
        rows={1}
        fullWidth={true}
        value={claim.title}
        onChange={this.upateField}
        errorText={this.getErrorText("title")}
        />
      <SelectField
        floatingLabelText="Category"
        value={claim.category}
        >
        {this.state.categories.map((item, index) =>
          <MenuItem
            value={item.id}
            primaryText={item.name}
            key={`claim-category-item-${index}`}
            />
        )}
      </SelectField>
      {this.showCategoryError()}
      <TextField
        id="description" 
        hintText="Description" 
        floatingLabelText="Description" 
        multiLine={true}
        rows={2}
        fullWidth={true}
        rowsMax={4}
        value={claim.description}
        onChange={this.updateField}
        errorText={this.getErrorText("description")}
        />
      <TextField
        id="url"
        hintText="Evidence of Claim (URL)"
        floatingLabelText="Evidence"
        fullWidth={true}
        value={claim.url}
        onChange={this.updateField}
        errorText={this.getErrorText("url")}
        />
      Pic Goes Here
    </div>
  }
}

export default ClaimFields;
