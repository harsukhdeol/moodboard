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
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
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
      userID: this.props.auth.user.name,
    };
    //add item with action
    this.props.addItem(newItem);
    //close modal

    this.toggle();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? (
          <Button color="dark" className="mb-2" onClick={this.toggle}>
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please login to view and manage items</h4>
        )}

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
  auth: state.auth,
});
export default connect(mapStateToProps, { addItem })(ItemModal);
