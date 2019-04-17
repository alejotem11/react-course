import React, { Component } from 'react';
import Person from './Person/Person';

// Thanks to webpack (which is implicitly used by react) this css file is
// dynamically mported into the html file Also, the properties will be prefixed
// to work in as many browsers as possible (-webkit.., etc)
// import './App.css';

// When you use CSS Modules (configuring the webpack.config.js file after
// executing $ yarn eject) you must import the css file as follows rather than:
// import './App.css'; When we configured the
// config/webpack.config.[dev||prod].js files to support css modules (properties
// 'modules' and 'localIdentName' added) we scope the css classes in the css
// files to the components where we import them, so we can now import the
// classes defined in our css file. The css loader tranforms our css classes
// names defined in our css file into a unique one using the localIdenName
// pattern we set up in the webpack config file, furthermore it converts those
// css classes to js objects
import classes from './App.css';

// Using inline styling you can't use pseudo selector or media queries(e.g.
// buttonStyle:hover) To solve that you can install the radium module to be able
// to use pseudo selectors and media queries in inline style. To be able to use
// media queries you must wrap your application with the StyleRoot element,
// otherwise an error will be thrown
import Radium, { StyleRoot } from 'radium';

class App extends Component {

  state = {
    persons: [
      { id: 'a1', name: 'Alejandro', age: 28 },
      { id: 'b2', name: 'Andres', age: 29 },
      { id: 'c3', name: 'Oscar', age: 26 }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] }; // Spread operator
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons });
  }

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  }

  deletePersonHandler = index => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons });
  }

  render() {
    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': { // This is possible because of Radium imported above and wrapping the exported component below. You can use any pseudo selector
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) =>
            <Person
              key={person.id}
              click={this.deletePersonHandler.bind(this, index)}
              name={person.name}
              age={person.age}
              changed={event => this.nameChangedHandler(event, person.id)} />)
          }
        </div>
      );

      buttonStyle.backgroundColor = 'red'; // Dynamically change the style of the button
      buttonStyle[':hover'] = { // Radium
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      // assignedClasses.push('red'); // Without using CSS Modules
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      // assignedClasses.push('bold'); // Without using CSS Modules
      assignedClasses.push(classes.bold);
    }
    
    return (
      <StyleRoot>
        {/* <div className='App'> --> This would be the way of setting the App class to this div if we were not using CSS modules*/}
        <div className={classes.App}>
          <p className={assignedClasses.join(' ')}>It is really working</p>
          <button
            style={buttonStyle}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

// Higher order component: It is just a component wrapping a component adding
// some extra functionality, in this case some extra syntax which will parse
// your styles and understand some extra features You can use it on both class
// based components (like App in this case) as well as functional components
// (like Person) export default Radium(App);
export default Radium(App);
