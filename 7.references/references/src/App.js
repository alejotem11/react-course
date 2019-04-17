import React, { Component } from 'react';
import './App.css';
import FancyButton from './components/FancyButton';

// Refs only are available in stateful components
// https://reactjs.org/docs/forwarding-refs.html

class App extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    this.buttonRef.current.focus(); // the "current" property of the ref holds the actual html element reference
  }

  buttonOneClickedHandle() {
    console.log('Button 1 clicked!');
  }

  buttonTwoClickedHandle() {
    console.log('Button 2 clicked!');
  }

  render() {
    return (
      <div className="App">
        <FancyButton
          label="Button 1"
          click={this.buttonOneClickedHandle} />
        <FancyButton
          label="Button 2"
          click={this.buttonTwoClickedHandle}
          ref={this.buttonRef} // A reference to this FancyButton is stored in the variable "buttonRef"
          />
      </div>
    );
  }
}

export default App;
