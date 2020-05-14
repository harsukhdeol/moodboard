import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v1 as uuid } from "uuid";

class List extends Component {
    state = {
        items: [
            {
                id: uuid(),
                name: "molk"
            },
            {
                id: uuid(),
                name: "cereal"
            },
            {
                id: uuid(),
                name: "pop tarts"
            },
            {
                id: uuid(),
                name: "waffles"
            }
        ]
    }
    render() {
        const { items } = this.state;

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
export default List;