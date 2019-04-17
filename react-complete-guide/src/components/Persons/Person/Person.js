// Functional React Component (Stateless components): it is just a function
// returning some jsx You can create components like this one (try to use this
// way always) or using a class extending the Component Class provided by React
// (Class based --> Stateful components)
import React, { Component } from 'react';
// To check the types of the incoming properties
import PropTypes from 'prop-types';
import AuthContext from '../../../auth-context';

// import './Person.css';
import classes from './Person.css';
// import Radium from 'radium';
// import WithClassOLD from '../../../hoc/WithClassOLD';
import withClass from '../../../hoc/withClass'; // In lower case since this is not a React component

/* // Functional Component (Stateless Component):
const person = props => {
  // const style = {
  //   '@media (min-width: 500px)': {
  //     width: '450px'
  //   }
  // }

  // To test the ErrorBoundary component uncomment the next lines:
  // const number = Math.random();
  // if (number < 0.5) {
  //   throw new Error('This is the auto generated error');
  // }

  return (
    <div className={classes.Person}>
      <p onClick={props.click}>I'm {props.name} and I am {props.age}</p>
      <p><b>{props.children}</b></p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  )
};

// export default Radium(person);
export default person; */

// Class based Component (Stateful Component):
class Person extends Component {

  // React 16.6: you can use the static variable contextType to tell the
  // component which context should connect to and React will populate the
  // variable "context" behind the scenes with the data provided by the
  // context you use. This feature MUST be used only in class based components
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    console.log('[CREATE Person.js] Inside constructor', props);
    this.inputElement = React.createRef(); // Availabe only on React 16.3 or higher. If you don't use this method to declare references you must use arrow functions in the ref property of your component
  }

  componentWillMount() {
    console.log('[CREATE Person.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[CREATE Person.js] inside componentDidMount()');
    // this.focus();
  }

  componentWillUnmount() {
    console.log('[REMOVE Person.js] inside componentWillUnmount()');
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Person.js] inside componentWillReceiveProps()', nextProps);
  }

  // This method is being called in the Persons component
  focus() {
    // Use References for ex. to focus or displying the element, but not for
    // styling
    // this.inputElement.focus();
    this.inputElement.current.focus(); // You must use "current" when you use the React.createRef() in the constructor
  }

  render() {
    console.log('[Person.js] Inside render()');
    return (
      // <div className={classes.Person}>
      // <WithClassOLD classes={classes.Person}>
      <>
        {/* <AuthContext.Consumer>
          {auth => auth ? <p>I'm authenticated</p> : null}
        </AuthContext.Consumer> */}
        {this.context.isAuth ? <p>I'm authenticated</p> : null}
        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age}</p>
        <p><b>{this.props.children}</b></p>
        {/*
          The children attribute from a React component could be html structure,
          some text or any other React component
        */}
        {/* ref property is a special property known by React which helps you
        get a reference to this element so you can do what you want with that
        element where you want, e.g. focus the input element
        References are only available on stateful components and you can use
        them in any html elemens as well as any React Component you want
        */}
        <input
          // ref={(inp) => { this.inputElement = inp }}
          ref={this.inputElement} // In React 16.3 you can use the React.createRef() in the constructor and pass it to the ref property
          type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </>
    )
  }
}

// PropTypes only work in stateful components, not in functional components
// (stateless)
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);