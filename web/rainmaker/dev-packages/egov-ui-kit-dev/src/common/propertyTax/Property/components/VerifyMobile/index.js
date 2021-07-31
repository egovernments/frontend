import React from "react";
import { Dialog, Button } from "components";
import Label from "egov-ui-kit/components/Label";
import { httpRequest } from "egov-ui-kit/utils/api";
import ListItem from "@material-ui/core/ListItem";
import "./index.css"
import ListItems from "./ListItems.js"

export default class ViewMobileDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    // this.handleInputSecond = this.handleInputSecond.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
    // this.setUpdate = this.setUpdate.bind(this);
  }
  addItem(e) {
    e.preventDefault();
    debugger;
    const newItem = this.state.currentItem;
    console.log("==========newItem", newItem);
    debugger;
    if (newItem.key === "") {
      window.alert("Please enter the phone number");
    }
    else if(newItem.text === ""){
      window.alert("Please enter the name");
    }
    else if(newItem.text !== "" || newItem.key !== ""){
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: '',
          key: ''
        }
      })
    }
    debugger;
  }
  handleInput = args => (e) => {
    debugger;
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        [args]: e.target.value,
      }
    })
  }
  // handleInputSecond(e){
  //   debugger;
  //   this.setState({
  //     currentItem:{
  //       key:e.target.value,
  //     }
  //   })
  // }
  render() {
    return (
      <Dialog
        open={this.props.open}
        isClose={true}
        handleClose={this.props.closeDialogue}
      ><Label label="Link Mobile No." fontSize="20px" labelClassName="owner-history" />
        <br />
        <Label label="Property Owner’s Mobile No." fontSize="12px" labelClassName="owner-history" />
        <ListItems items={this.state.items} />
        <Label label="Add Alternate Mobile No." fontSize="20px" labelClassName="owner-history" />
        <br />
        <Label label="This Mobile no. will be used to notify you about property tax dues and important dates" fontSize="12px" labelClassName="owner-history" />
        <form id="to-do-form" onSubmit={this.addItem} className="list" >
          <input type="text"
            placeholder="Enter Name"
            pattern="/^[^{0-9}^\$\<>?\\\\~!@#$%^()+={}\[\]*,/_:;“”‘’]{1,50}$/i"     
            value={this.state.currentItem.text}
            onChange={this.handleInput('text')}></input>
          <input type="text"
            placeholder="Enter Mobile no."
            pattern="[6789][0-9]{9}"
            value={this.state.currentItem.key}
            onChange={this.handleInput('key')}></input>
          <button type="submit">ADD</button>
        </form>
        <p>{this.state.items.text}</p>
      </Dialog>

    )
  }
}
