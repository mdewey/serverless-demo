import { Route } from 'react-router-dom';
import React, { Component } from 'react';

import Home from './pages/Home.jsx'

class App extends Component {
  constructor() {
    super();
  };
  render() {
    return (
      <div>
        <div className="App">
          <Route path="/" exact component={Home}></Route>
        </div>
      </div>
    );
  }
}
export default App;