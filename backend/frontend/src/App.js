import React from 'react';
import AppNavBar from './components/AppNavBar'
import List from "./components/List"

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

function App() {
  return (
    <div className="App">
      <AppNavBar />
      <List />
    </div>
  );
}

export default App;
