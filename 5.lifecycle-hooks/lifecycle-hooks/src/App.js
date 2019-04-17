import React, { Component } from 'react';
import User from './User/User';
import './App.css';

class App extends Component {

  state = {
    showUserComponent: true,
    countUser: 0
  };

  removeUserHandler = () => {
    this.setState({ showUserComponent: false });
  }

  updateUserHandler = () => {
    this.setState((prevState, props) => {
      return { countUser: prevState.countUser + 1 };
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.showUserComponent ? <User count={this.state.countUser}/> : null}
        <button onClick={this.removeUserHandler}>Remove the User Component</button>
        <button
          onClick={this.updateUserHandler}>Update the User Component</button>
      </div>
    );
  }
}

export default App;
