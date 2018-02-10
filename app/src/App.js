import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      secret: "loading..."
    }
  }

  componentDidMount() {
    fetch("https://40bro24ihl.execute-api.us-east-1.amazonaws.com/dev")
      .then(resp => {
        console.log(resp)
        return resp.json()
      })
      .then(data => {
        console.log(data);
        this.setState(() => {
          return {
            secret: data.hello
          }
        })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.secret}
        </p>
      </div>
    );
  }
}

export default App;
