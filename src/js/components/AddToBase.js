import React, { Component } from 'react';


class AddToBase extends Component {
  constructor(props) {
    super(props);
  }


  addSuccess (data) {
    this.cancelAddItem();
    return this.props.refresh();
  }


  itemsSuccess = (data) => {
    let items = [];

    for (item in data) {
      let found = false;
      for (existing in this.props.items) {
        if (Number(item.id) == Number(existing.id)) {
          found = true;
        }
      }

      if (found) items.push(item);
    }

    this.setState({ itemList: items });
  }


  itemsError (error) {
    this.setState({ itemsError: true });
  }


  handleChange (event, index, value) {
    this.setState({ item: value });
  }


  doShowItems () {
    this.setState({ showItems: true });
  }


  cancelAddItem () {
    this.setState({ 
      item: null,
      showItems: false
    });
  }


  doShowError = () => {
    if (this.state.error != false) {
      return <div>{this.state.error}</div>;
    }
  }

  render () {
    // TODO: Figure out HOC implementation for this
  }



}

export default AddToBase;