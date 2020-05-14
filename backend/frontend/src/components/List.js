import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v1 as uuid } from "uuid";

import { connect } from 'react-redux';
import { getItems } from "../actions/itemActions"
import PropTypes from "prop-types"

class List extends Component {
    componentDidMount() {
        this.props.getItems();
    }
    render() {
        const { items } = this.props.item;

        return (
            <Container>
                <Button
                    color="dark"
                    style={{ marginBottom: "2rem" }}
                    onClick={() => {
                        const name = prompt('Enter name')
                        if (name) {
                            this.setState(state => ({
                                items: [...state.items, { id: uuid(), name }]
                            }))
                        }
                    }}
                >
                    Add Item</Button>

                <ListGroup>
                    <TransitionGroup className="list">
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn mr-2"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                items: state.items.filter(item => item.id !== id)
                                            }))
                                        }}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>

        )
    }
}
List.propTypes = {
    getItems: PropTypes.func.isRequired,//actions from redux are stored as prop
    item: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    item: state.item
})
export default connect(mapStateToProps, { getItems })(List);