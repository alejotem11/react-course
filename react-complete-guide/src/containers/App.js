// The idea of a container (class based components) is to have a state (Stateful
// components), define the handlers which manipulates such state and be the most
// clean possible when rendering the jsx code

// It is necessary to import React even though we are not explicitly using it,
// but behind the scenes when the jsx code is compiled the React.createElement()
// method is called
import React, { PureComponent } from 'react';

import classes from './App.css';

// All the react components must start with a capital letter since the lower
// ones are reserved to native html elements like div, h1, p, etc, even though
// the exported function is in lower case, what really matters is the file name
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Profile from '../components/Profile/Profile';

// import WithClassOLD from '../hoc/WithClassOLD';
import withClass from '../hoc/withClass'; // In lower case since this is not a React component

// The React Context API allows us to set global variables that can be read in
// other components without passing around props. In our case false is the
// default value but it can be any object
// OLD way to use it:
/* export const AuthContext = React.createContext({
  isAuth: false,
  toggleAuth: {}
}); */

// Using Context-API in React 16.6
import AuthContext from '../auth-context';

// If you don't want to check every property of the state or props object to
// check if the component should be updated (shouldComponentUpdate() method) you
// can use the PureComponent class instead of using the Component class ---
// NOTE: You should only use PureComponent or React.memo() if you know that
// updates might not be required, because you could prevent the updates of child
// components when you intend to do that if the parent is a PureComponent. On
// the other hand you could get a performance hit becuase PureComponents or
// React.memo() compare all the old props and state to the new ones
class App extends PureComponent {

  // If you need to use constructor you should do it like this:
  constructor(props) {
    super(props);
    console.log('[CREATE App.js] Inside constructor', props);
    this.state = { // you have to call it state - the name is not optional
      persons: [
        { id: 'a1', name: 'Alejandro', age: 28 },
        { id: 'b2', name: 'Andres', age: 29 },
        { id: 'c3', name: 'Oscar', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      isAuth: false,
      profileName: 'Dummy'
    }
  }

  componentWillMount() {
    console.log('[CREATE App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[CREATE App.js] inside componentDidMount()');
  }

  /* shouldComponentUpdate (nextProps, nextState) {
    console.log('[UPDATE App.js] inside shouldComponentUpdate()', nextProps, nextState);
    // Checking if something change to skip unnecesary work to avoid
    // performance issues
    return nextState.persons !== this.state.persons ||
      nextState.showPersons !== this.state.showPersons;
  } */

  // but whenever you can, use the follow syntax because it is much easier:
  // * state can only be accessed in class-based components!
  // * Only changes in props  and/or state trigger React to re-render your
  //   components and potentially update the DOM in the browser
  // * The difference to props  is, that this happens within one and the same
  //   component - you don't receive new data (props ) from outside!
  /* state = { // you have to call it state - the name is not optional
    persons: [
      { id: 'a1', name: 'Alejandro', age: 28 },
      { id: 'b2', name: 'Andres', age: 29 },
      { id: 'c3', name: 'Oscar', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  } */

  // Declaring a method in the following way, the this word is undefined
  // dummyMethod() {
  //   console.log(this);
  // }
  // This is why you should always use the arrow functions, where the this
  // word reprents the class
  dummyMethod = () => { console.log(this); }

  // It is good practice to end the name of the handlers with the word Handler
  switchNameHandler = (newName) => {
    // DON'T DO THIS: this.state.[property] = [value];
    // For React to be able to update the DOM when the state changes use setState()
    this.setState({ // This will not affect the other properties
      persons: [
        { id: 'a1', name: newName, age: 28 },
        { id: 'b2', name: 'Andres', age: 29 },
        { id: 'c3', name: 'Oscar', age: 30 }
      ]
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    // Since you should ALWAYS use the IMMUTABLE way to update the state use:
    const person = { ...this.state.persons[personIndex] }; // Spread operator
    // or
    // const person = Object.assign({}, this.state.persons[personIndex]);
    // You shouldn't use:
    // const person = this.state.persons[personIndex];
    // Since arrays and objects are reference types

    person.name = event.target.value; // event.target points to the element that triggers the event, in this case the input element
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  }

  togglePersonsHandler = () => {
    // You shouldn't manipulate the state inside the setState() method as
      // below because the setState() is called asyncronously by React, which
      // means that other React component could manipulate the state and
      // finish before this one, so here your state could be different to
      // what you expect
    /* this.setState({
      showPersons: !this.state.showPersons,
      toggleClicked: this.state.toggleClicked + 1
    }); */

    // A better approach if you are mutating the state relying on the previous
    // state:
    this.setState((prevState, props) => {
      return {
        // This is now safe to access the prevState because this can't be 
        // mutated for anyone else in the app
        showPersons: !prevState.showPersons,
        toggleClicked: prevState.toggleClicked + 1
      };
    });
  }

  deletePersonHandler = index => {
    // You should ALWAYS update the state using the IMMUTABLE way
    // MUTABLE: Since the objects and arrays are reference type all the modififications will affect
    // the original array if you declared the constant persons as follows:
    // const persons = this.state.persons;
    // though, it works in this case this is not a good pratice
    // IMMUTABLE: so you will have to copy the array into the variable either:
    // const persons = this.state.persons.slice();
    // or using the ES6 spread operator feature:
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons });
  }

  toggleAuth = () => {
    console.log(this.state);
    this.setState(prevState => {
      return {
        isAuth: !prevState.isAuth
      };
    })
  }

  changeNameProfileHandler = () => {
    const rnd = Math.floor(Math.random() * 3);
    this.setState({
      profileName: this.state.persons[rnd].name
    });
  }

  // Prepare & Structure your JSX Code; The render() method compare the old
  // VIRTUAL DOM with the future VIRTUAL DOM, to check if the real DOM needs to
  // be updated, so it doesn't mean that the real DOM is being updated whenever
  // render() is called. React only updates the element that changed, and not
  // everything presented in the DOM. To avoid this comparison you could use the
  // implementation of the shouldComponentUpdate() method (See the
  // 5.lifecycle-hooks.txt file) or use PureComponent but be aware of the
  // possible issues mentioned above
  render() {
    console.log('[App.js] Inside render()');
    let persons = null;

    if (this.state.showPersons) {
      persons =
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />;
    }

    return ( // To inject js expressions in jsx use {}
      // <StyleRoot>
      // <div className="App">
      // To avoid wrapping your jsx with an element you can return an
      // array. e.g:
      // [
      //   <h1 key="1">First element of the array</h1>,
      //   <p key="2">Second element of the array</p>,
      //   <h3 key="3">Third element of the array</h3>
      // ]
      // or making use of higher order components
      // <div className={classes.App}>
      // <WithClassOLD classes={classes.App}>
      // or using fragments (<>)
      <>
        <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
        <Profile name={this.state.profileName} />
        <button onClick={this.changeNameProfileHandler}>Change profile name</button>
        {/* { // Rendering conditionally
          // It is not possible to use if statement. You must use simple statements, no block statements in jsx
          // The below code works but it could become complicated if you use nested conditionals
          this.state.showPersons ?
            <div>
              <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
              <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My Hobbies: Studying</Person>
              <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
            </div>
          : null
        } */}
        <AuthContext.Provider value={{
          isAuth: this.state.isAuth,
          toggleAuth: this.toggleAuth
        }}>
          <Cockpit
            appTitle={this.props.title}
            persons={this.state.persons}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonsHandler} />
          {persons}
        </AuthContext.Provider>
      </>
      // </StyleRoot>
    );

    // The same result than above without using jsx:
    // return React.createElement('div', { className: 'App' }
    //     , React.createElement('h1', null, 'Hello world!'));
  }
}
export default withClass(App, classes.App);
