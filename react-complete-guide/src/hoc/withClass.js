// A different approach to be able to add extra functionality to the React
// Components that make use of this Higher Order Component

import React from 'react';

const withClass = (WrappedComponent, className) => { // Returning a JS function
    // DON'T maninpulate the wrapped component here, just use it
    // In this case we are returning a functional component, but you could
    // also return a stateful component (class based)
    /* return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    ); */

    // If you need a stateful component e.g. to have access to the lifecycle
    // hooks:
    /* return class extends React.Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    } */

    // If you use References (ref property) on any of the Wrapped Components,
    // you can return a React.forwardRef (available in React 16.3 and above) in
    // the HOC instead of returning a React component (either class based or
    // functional component), to avoid potential errors when you call methods
    // from that Reference, thus when you use the ref property you will point to
    // the wrapped react component and not to the higher order component
    const WithClass = class extends React.Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent
                        ref={this.props.forwardedRef}
                        {...this.props} />
                </div>
            );
        }
    };
    return React.forwardRef((props, ref) => {
        return <WithClass {...props} forwardedRef={ref} />
    });
}

export default withClass;