import React, { PureComponent } from 'react';
// In the ErrorBoundary.js file we define what we want to render whenever
// component we wrap with the ErrorBoundary throws an error
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Person from './Person/Person';

/* // Functional Component (Stateless Component):
const persons = props => props.persons.map((person, index) =>
    <ErrorBoundary key={person.id}>
        <Person
            click={props.clicked.bind(this, index)}
            name={person.name}
            age={person.age}
            changed={event => props.changed(event, person.id)} />
    </ErrorBoundary>);

export default persons; */

// Class based Component (Stateful Component):
export default class Persons extends PureComponent {

    constructor (props) {
        super(props);
        console.log('[Persons.js] Inside constructor', props);
        this.lastPerson = React.createRef(); // To make a reference to the last Person component
    }

    componentWillMount () {
        console.log('[CREATE Persons.js] Inside componentWillMount()');
    }

    componentDidMount () {
        console.log('[CREATE Persons.js] inside componentDidMount()');
        // Here we are calling a method from other component (in this case
        // Person), but since we use Higher Order Component (HOC) to wrap our
        // Person component you must return a React.forwardRef in the HOC so the
        // "current" object is pointing to the Person component instead of the
        // HOC (WithClass Component) thus being able to call the focus() method
        this.lastPerson.current.focus();
    }

    componentWillUnmount () {
        console.log('[CREATE Persons.js] inside componentWillUnmount()');
    }

    componentWillReceiveProps (nextProps) {
        console.log('[UPDATE Persons.js] inside componentWillReceiveProps()', nextProps);
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] inside shouldComponentUpdate', nextProps, nextState);
        // If it is false it won't update the react component
        return nextProps.persons !== this.props.persons || // Check if the array is a different object
            nextProps.changed !== this.props.changed ||
            nextProps.clicked !== this.props.clicked;
    } */

    componentWillUpdate (nextProps, nextState) {
        console.log('[UPDATE Persons.js] inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate () {
        console.log('[CREATE Persons.js] inside componentDidUpdate()');
    }

    render() {
        console.log('[Persons.js] Inside render()');
        return this.props.persons.map((person, index) =>
            // During development mode you will see the error instead of html
            // code you defined in the ErrorBoundary.js file. If the app crashes
            // in production you will see the html code that you wrote. You
            // should wrap only the components where you know errors could be
            // thrown
            <ErrorBoundary key={person.id}>
                <Person
                    click={this.props.clicked.bind(this, index)}
                    position={index}
                    name={person.name}
                    age={person.age}
                    changed={event => this.props.changed(event, person.id)}
                    ref={this.lastPerson} // Reference to another component (Person) outside of this component (Persons)
                />
            </ErrorBoundary>);
    }
}