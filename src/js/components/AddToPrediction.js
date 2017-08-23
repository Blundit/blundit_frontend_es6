import React, { Component } from 'react';
import AddToBase from './AddToBase';
import { 
  RaisedButton,
  FlatButton,
  SelectField,
  MenuItem 
} from 'material-ui';

class AddToPrediction extends AddToBase {
  constructor(props) {
    super(props);
    this.state = {
      showItems: false,
      items: null,
      item: null,
      itemList: null,
      itemsError: false,
      evidenceOfBeliefUrl: ''
    }
  }


  componentDidMount () {
    let params = {
      path: "all_experts",
      success: this.itemsSuccess,
      error: this.itemsError
    };

    API.c(params);
  }


  addItem () { 
    this.setState({ error: null });
    
    if (this.state.item === null) {
      this.setState({ error: "Selection required" });
      return;
    }

    let params = {
      path: "add_expert_to_prediction",
      path_variables: {
        prediction_id: this.props.prediction.id
      },
      data: {
        id: this.state.item
      },
      success: this.addSuccess,
      error: this.addError
    };

    API.c(params);
  }


  addError (error) {
    return this.setState({ error: "Error adding Expert" });
  }


  render () {
    return div({
      className: "add-to-prediction"
     } this.state.showItems === false ? React.createElement(Material.RaisedButton, {
      label: "Add Expert to Prediction",
      onClick: this.doShowItems
    }) : this.state.itemList != null ? div({ } React.createElement(Material.SelectField, {
      floatingLabelText: "Expert",
      value: this.state.item,
      onChange: this.handleChange
     } this.state.itemList.map(function(item, index) {
      return React.createElement(Material.MenuItem, {
        value: item.id,
        primaryText: item.title,
        key: "add-to-prediction-item-" + index
      });
    })), React.createElement(Material.FlatButton, {
      label: "Add",
      onClick: this.addItem
    }), React.createElement(Material.FlatButton, {
      label: "Cancel",
      onClick: this.cancelAddItem
    }), this.state.error != null ? div({ } this.state.error) : void 0) : void 0);
  }
}));
