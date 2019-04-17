// It is necessary to import React even though we are not explicitly using it,
// but behind the scenes when the jsx code is compiled the React.createElement()
// method is called
import React, { Component } from 'react';
// Thanks to webpack (which is implicitly used by react) this css file is 
// dynamically mported into the html file
// Also, the properties will be prefixed to work in as many browsers as possible (-webkit.., etc)
import './App.css';

// All the react components must start with a capital letter since when the lower
// ones are reserved to native html elements like div, h1, p, etc
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  // * state can only be accessed in class-based components!
  // * Only changes in props  and/ or state  trigger React to re-render your
  // components and potentially update the DOM in the browser
  // * The difference to props  is, that this happens within one and the same
  // component - you don't receive new data (props ) from outside!
  state = { username: 'default-username' } // you have to call it state - the name is not optional

  // It is good practice to end the name of the handlers with the word Handler
  usernameChangedHandler = event => {
    // DON'T DO THIS: this.state.[property] = [value];
    // For React to be able to update the DOM when the state changes use setState()
    this.setState({ username: event.target.value }); // event.target points to the element that triggers the event, in this case the input element
  }

  render() {
    return (
      <div className="App">
        <UserInput username={this.state.username} changed={this.usernameChangedHandler} />
        <UserOutput username={this.state.username} />
      </div>
    );
  }
}

export default App;
