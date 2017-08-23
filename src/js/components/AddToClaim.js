import React, { Component } from 'react';
import AddToBase from './AddToBase';
import { 
  RaisedButton, 
  FlatButton, 
  SelectField, 
  MenuItem 
} from 'material-ui';


class AddToClaim extends AddToBase {
  constructor(props) {
    super(props);

    this.state = {
      showItems: false,
      items: null,
      item: null,
      itemList: null,
      itemsError: false,
      evidenceOfBeliefUrl: '',
      error: false
    };
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
      path: "add_expert_to_claim",
      path_variables: {
        claim_id: this.props.claim.id
      },
      data: {
        id: this.state.item
      },
      success: this.addSuccess,
      error: this.addError
    };

    return  API.c(params);
  }


  addError (error) {
    return this.setState({ error: "Error adding to Claim" });
  }


  doShowItems = () => {
    if (this.state.showItems == false) {
      return <RaisedButton label="Add Expert to Claim" onClick={this.doShowItems} />;
    } else {
      if (this.state.itemList != null) {
        return <div>
          <SelectField floatingLabelText="Expert" value={this.state.item} onChange={this.handleChange}>
              {this.state.itemList.map((item, index) =>
                <MenuItem value={item.id} primaryText={item.title} key={"add-to-claim-item-"+index} />
              )}
          </SelectField>
          <FlatButton label="Add" onClick={this.addItem} />
          <FlatButton label="Cancel" onClick={this.cancelAddItem} />
          {this.doShowError()}
        </div>
      }
    }
  }


  render () {
    return <div className="add-to-claim">
      {this.doShowItems()}
    </div>;
  }

}

export default AddToClaim;
