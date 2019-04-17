import React from 'react';

// A different approach to be able to add extra functionality to the React
// Components that make use of this Higher Order Component
const addSomeTextAtTheEnd = (WrappedComponent, text) => {
    // DON'T maninpulate the wrapped component here, just use it
    // In this case we are returning a functional component, but you could
    // also return a stateful component (class based)
    /* return props => (
        <div>
            <WrappedComponent {...props} />
            <p>{text}</p>
        </div>
    ); */

    // If you need a stateful component e.g. to have access to the lifecycle
    // hooks:
    return class extends React.Component {
        render() {
            return (
                <div>
                    <WrappedComponent {...this.props} />
                    <p>{text}</p>
                </div>
            );
        }
    };
};

export default addSomeTextAtTheEnd;