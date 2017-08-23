import React, { Component } from 'react';
import AddToBase from './AddToBase';
import Utils from '../shared/Utils';
import { 
  RaisedButton,
  FlatButton,
  SelectField,
  MenuItem 
} from 'material-ui';

class AddToExpert extends AddToBase {
  constructor(props) {
    super(props);

    this.state = {
      showItems: false,
      items: null,
      item: null,
      itemList: null,
      itemsError: false,
      evidenceOfBeliefUrl: '',
      user: null
    }
  }


  handleUserChange (data) {
    return this.setState({
      user: UserStore.get()
    });
  }


  componentWillUnmount () {
    return UserStore.unsubscribe(this.handleUserChange);
  }


  componentDidMount () {
    UserStore.subscribe(this.handleUserChange);
    let params = {
      path: "all_" + this.props.type + "s",
      success: this.itemsSuccess,
      error: this.itemsError
    };
    return API.c(params);
  }


  addItem () {
    this.setState({ error: null });
    
    if (this.state.item === null) {
      this.setState({ error: "Selection required" });
      return;
    }

    let params = {
      path: "add_" + this.props.type + "_to_expert",
      path_variables: {
        expert_id: this.props.expert.id
      },
      data: {
        id: this.state.item,
        evidence_of_belief_url: this.state.evidenceOfBeliefUrl
      },
      success: this.addSuccess,
      error: this.addError
    };
    return API.c(params);
  }
  

  addError (error) {
    return this.setState({ error: "Error adding " + (Utils.sentenceCase(this.props.type)) });
  }
  
  
  changeEvidenceOfBelief (event) {
    return this.setState({ evidenceOfBeliefUrl: event.target.value });
  }


  render () {
    const { user } = this.state;
    [ not_logged_in, logged_in, error ] = null;

    if (user && user.token) {
        if (this.state.showItems == false) {
          logged_in = <RaisedButton
            label={`Add ${this.props.type} to Expert`}
            primary={true}
            onClick={this.doShowItems}
            />;
        } else {
          if (this.state.itemList) {
            logged_in = <div>
              <SelectField
                floatingLabelText={this.sentenceCase(this.props.type)}
                value={this.state.item}
                onChange={this.handleChange}
                >
                {this.state.itemList.map((item, index) =>
                  <MenuItem value={item.id} primaryText={item.title} key={`add-to-expert-item-${index}`}/>
                )}
              </SelectField>
              <TextField
                valu={this.state.evidence_of_belief_url}
                hintText={`Add Evidence that expert made this ${this.props.type} (optional)`}
                fullWidth={true}
                onChange={this.changeEvidenceOfBelief}
                />
              <FlatButton label="Add" onClick={this.addItem} />
              <FlatButton label="Cancel" onClick={this.cancelAddItem} />
            </div>
          }
        }
    } else {
      not_logged_in = <div>{`If you were logged in, you'd be able to add a ${@props.type} to this expert.`}</div>;
    }

    if (this.state.error) {
      error = <div>{this.state.error}</div>;
    }

    return <div className="add-to-expert">
      {not_logged_in}
      {logged_in}
      {error}
    </div>;
  }

}

export default AddToExpert;
