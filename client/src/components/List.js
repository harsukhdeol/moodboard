import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardColumns,
  Button,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class List extends Component {
  componentDidMount() {
    this.displayItems();
    this.timer = setInterval(() => this.displayItems(), 2000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  displayItems() {
    if (this.props.auth.isAuthenticated) {
      this.props.getItems(this.props.auth.user._id);
    }
  }
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };
  static propTypes = {
    getItems: PropTypes.func.isRequired, //actions from redux are stored as prop
    item: PropTypes.object,
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { items } = this.props.item;

    return (
      <CardColumns>
        {this.props.auth.isAuthenticated ? (
          <TransitionGroup className="list">
            {items.map(({ _id, name, title, imgURL }) => (
              <CSSTransition key={_id} timeout={2000} classNames="fade">
                <Card>
                  {imgURL ? (
                    <CardImg
                      top
                      width="100%"
                      src={imgURL}
                      alt="Card image cap"
                    />
                  ) : null}

                  <CardBody>
                    <CardTitle className="font-weight-bold">{title}</CardTitle>
                    <CardText>{name}</CardText>

                    <Button
                      className="remove-btn mr-2"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times; Delete Item
                    </Button>
                  </CardBody>
                </Card>
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : null}
      </CardColumns>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
});
export default connect(mapStateToProps, { getItems, deleteItem })(List);
