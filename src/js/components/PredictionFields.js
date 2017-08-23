import React, { Component } from 'react';

import {
  TextField,
  SelectField,
  MenuItem,
  DatePicker
} from 'material-ui';

class PredictionFields extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categories: null
    };
  }


  componentDidMount () {
    let params = {
      path: "categories",
      success: this.categoryListSuccess,
      error: this.categoryListError
    };
    API.c(params)
  }


  categoryListSuccess = (data) => {
    return this.setState({
      categories: data
    });
  }


  categoryListError = (error) => {}


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

  updateDate (event, date) {
    this.props.updateField("prediction_date", date);
  }


  render () {
    if (this.state.categories == null) {
      return <div>Loading...</div>;
    }

    const { prediction } = this.props;
    [ show_error ] = null;

    if (this.getErrorText("category")) {
      show_error = <div>{this.getErrorText("category")}</div>;
    }
 
    return <div>
      <TextField
        id="title"
        hintText="Prediction Title"
        floatingLabelText="Title"
        multiLine={false}
        rows={1}
        fullWidth={true}
        value={prediction.title}
        onChange={updateField}
        errorText={getErrorText("title")}
        />
      <SelectField
        floatingLabelText="Category"
        value={prediction.category}
        onChange={this.handleCategoryChange}
        >
        {this.state.categories.map((item, index) =>
          <MenuItem value={item.id} primaryText={item.name} key={`prediction-category-item-${index}`}/>
        )}
      </SelectField>
      {show_error}
      <TextField
        id="description"
        hintText="Description"
        floatingLabelText="Description"
        multiLine={true}
        rows={2}
        fullWidth={true}
        rowsMax={4}
        value={prediction.description}
        onChange={this.updateField}
        errorText={getErrorText("description")}
        />
      <DatePicker
        hintText="Prediction Date"}
        value={prediction.prediction_date}
        onChange={this.updateDate}
        errorText={this.getErrorText("prediction_date")}
        />
      <TextField
        id="url"
        hintText="Evidence of Prediction (URL)"
        floatingLabelText="Evidence"
        fullWidth={true}
        value={prediction.url}
        onChange={updateField}
        errorText={getErrorText("url")}
        />
      Pic Goes Here
    </div>
  }
}

export default PredictionFields;
