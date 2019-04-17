import React from 'react';

// If you don't want to check every property of the state or props object to
// check if the component should be updated (shouldComponentUpdate() method) you
// can use the PureComponent class instead of using the Component class NOTE:
// You should only use PureComponent if you know that updates might not be
// required, because you could prevent the updates of child components when you
// intend to do that if the parent is a PureComponent. On the other hand you
// could get a performance hit becuase PureComponents compare all the old props
// and state to the new ones
export default class User extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { someState: 'Something' };
        console.log('[CREATE User.js] constructor()');
    }

    componentWillMount() {
        console.log('[CREATE User.js] componentWillMount()');
    }

    componentDidMount() {
        console.log('[CREATE User.js] componentDidMount()');
    }

    componentWillUnmount() {
        console.log('[REMOVE User.js] componentDidMount()');
    }

    // Update Triggered by Parent --> via props
    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE User.js] componentWillRecieveProps()', nextProps);
    }

    // Checking if something change to skip unnecesary work to avoid
    // performance issues
    /* shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE User.js] shouldComponentUpdate()', nextProps, nextState);
        return nextProps.count !== this.props.count ||
            nextState.someState !== this.state.someState;
    } */

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE User.js] componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE User.js] componentDidUpdate()');
    }

    // NOTE: React 16.6 advise avoid using the methods:
    // - componentWillMount
    // - componentWillUpdate
    // - componentWillReceiveProps
    // Instead you should use the method getDerivedStateFromProps:
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[UPDATE User.js] getDerivedStateFromProps()', nextProps, prevState);
        return prevState; // You must return the new state, in this case is the same as the last one
    }

    // This is going to be executed right before the dum gets updated
    getSnapshotBeforeUpdate() {
        console.log('[UPDATE User.js] getSnapshotBeforeUpdate()');
    }

    // Prepare & Structure your JSX Code; The render() method compare the old
    // VIRTUAL DOM with the future VIRTUAL DOM, to check if the real DOM needs
    // to be updated, so it doesn't mean that the real DOM is being updated
    // whenever render() is called. React only updates the element that changed,
    // and not everything presented in the DOM. To avoid this comparison you
    // could use the implementation of the shouldComponentUpdate() method (See
    // the 5.lifecycle-hooks.txt file) or use PureComponent but be aware of the
    // possible issues mentioned above
    render() {
        console.log('[RENDER User.js] render()');
        return (
            <div>
                <p>I am the User Component #{this.props.count}</p>
            </div>
        );
    }
}