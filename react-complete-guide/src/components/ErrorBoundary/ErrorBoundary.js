import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: '',
    }

    // The componentDidCatch is the method which is going to be executed
    // whenever component we wrap with the ErrorBoundary throws an error
    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessage: error });
    }

    render() {
        if (this.state.hasError) {
            return (
                <h1>Something went wrong! {this.state.errorMessage}</h1>
            );
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;