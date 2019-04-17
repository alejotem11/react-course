import React from 'react';
import classes from './Cockpit.css';
// import Aux from '../../hoc/Aux';
import AuthContext from '../../auth-context';

class Cockpit extends React.Component {

    static contextType = AuthContext;
    
    render() {
        // Dynamically assing css classes (These should be present in the css file)
        const assignedClasses = [];
        let btnClass = classes.Button;

        if (this.props.showPersons) {
            btnClass = [classes.Button, classes.Red].join(' '); // This is just a string created by the css loader
        }

        if (this.props.persons.length <= 2) {
            // classes.push('red'); // Without using CSS Modules
            assignedClasses.push(classes.red);
        }
        if (this.props.persons.length <= 1) {
            // classes.push('bold'); // Without using CSS Modules
            assignedClasses.push(classes.bold);
        }

        return (
            // You can use higher order components to wrap the jsx code instead
            // of adding an html container like <div>, so the final html result
            // wouldn't have additional html elements to the ones desired
            // <Aux> --> See the hoc/Aux.js file
            // The same functionality than our Aux component can be achieved
            // using the <> tag - a so called "fragment"
            <>
                <h1>{this.props.appTitle}</h1>
                <p className={assignedClasses.join(' ')}>It is really working</p>
                {/*
          In normal html or js the event is all in lower case, in jsx is onClick
          Don't add parenthesis to the handler: this.switchNameHandler()
          This would execute the function immediatly once react renders the
          component to the DOM. We only want to pass a reference and to do this
          you just have to ignore the parenthesis
        */}
                {/* <button onClick={this.switchNameHandler}>Switch name</button> */}
                {/* 
          To pass arguments to a function you could:
          1. Use this one always when you can because of performance...
            Use the bind method passing the this object as the first argument:
            <button onClick={this.switchNameHandler.bind(this, 'Luis')}>Switch name</button>
          2. Pass an arrow function to the event that returns the function you want to execute.
            The problem with using an arrow function in the render call is it will create a new
            function every time, which ends up causing unneeded re-renders.
            Note that the function is not going to be executed until the event triggers:
            <button onClick={() => this.switchNameHandler('Luis')}>Switch name</button>
        */}
                <button
                    className={btnClass}
                    onClick={this.props.clicked}>Toggle Persons</button>
                <button onClick={this.context.toggleAuth}>Log in</button>
            </>
        );
    }
};

export default Cockpit;