import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    text: '',
    length: 0
  };

  onChangeHandler = event => {
    this.setState({
      text: event.target.value
    });
  };

  removeLetterHandler = index => {
    const arrayText = this.state.text.split('');
    arrayText.splice(index, 1);
    const text = arrayText.join('')
    this.setState({ text });
  }

  render() {
    const arrayText = this.state.text.split('');
    const chars = arrayText.map((item, index) => (
      <Char
        letter={item}
        onClick={this.removeLetterHandler.bind(this, index)}
        key={index} />
    ));
    return (
      <div>
        <input
          type="text"
          onChange={this.onChangeHandler}
          value={this.state.text} />
        <p>{this.state.text.length}</p>
        <Validation length={this.state.text.length} />
        {chars}
      </div>
    );
  }
}

export default App;
