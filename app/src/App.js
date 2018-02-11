import { Route } from 'react-router-dom';
import React, { Component } from 'react';

import Callback from './pages/Callback';
import Auth from './auth/Auth';
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Report from './pages/Report.jsx'

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  console.log({nextState, replace})
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    console.log(auth);
    auth.handleAuthentication();
  }
}



class App extends Component {
  constructor() {
    super();
  };
  render() {
    return (
      <div>
        <div className="App">
          <Route path="/" exact component={Home}></Route>
          <Route path="/home" exact component={Dashboard}></Route>
          <Route path="/ben-points" exact component={Report}></Route>
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Dashboard {...props} />
          }} />
        </div>
      </div>
    );
  }
}
export default App;