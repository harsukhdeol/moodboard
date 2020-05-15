import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

//container - component hooked to redux
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }); //.name gets name attribute of form input
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
    };
    //add item with action
    this.props.addItem(newItem);
    //close modal

    this.toggle();
  };
  render() {
    return (
      <div>
        <Button color="dark" className="mb-2" onClick={this.toggle}>
          Add Item
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add item"
                  onChange={this.onChange}
                />

                <Button color="dark" className="mt-2" block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  //map action to prop
  item: state.item,
});
export default connect(mapStateToProps, { addItem })(ItemModal);
