import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact-data">Contact Data</Link></li>
          </ul>
        </nav>
        <h3>Hello world!</h3>
        <Route path="/contact-data" component={ContactData} />
      </div>
    );
  }
}

export default App;
