import React, { Component } from 'react';
import User from './component/User';
import Shopping from './component/Shopping';
import Aux from './hoc/Aux';
import './App.css';

class App extends Component {
  // To avoid wrapping your jsx with an element you can return an
  // array. e.g:
  // [
  //   <h1 key="1">First element of the array</h1>,
  //   <p key="2">Second element of the array</p>,
  //   <h3 key="3">Third element of the array</h3>
  // ]
  // or make use of higher order components (see the User.js file)
  render() {
    return (
      <div className="App">
        <User name="Alejandro" />
        <Aux>
          <Shopping />
        </Aux>
        {/* You can use the <> operator instead of <Aux> */}
        <>
          <Shopping />
        </>
      </div>
    );
  }
}

export default App;
