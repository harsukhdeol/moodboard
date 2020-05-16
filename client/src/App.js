import React, { Component } from "react";
import AppNavBar from "./components/AppNavBar";
import List from "./components/List";
import ItemModal from "./components/ItemModal";

import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser()); //will call load user right when app loads
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <ItemModal />
            <List />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
