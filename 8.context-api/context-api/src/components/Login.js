import React, { Component } from 'react';

import AuthContext from '../auth-context';

/* const login = props => (
    <AuthContext.Consumer>
        {authContext => {
            return (
                <button onClick={authContext.toggleAuth}>
                    {authContext.isAuth ? 'Logout': 'Login'}
                </button>
            );
        }}
    </AuthContext.Consumer>
);

export default login; */

class Login extends Component {
    // React 16.6: you can use the static variable contextType to tell the
    // component which context should connect to and React will populate the
    // variable "context" behind the scenes with the data provided by the
    // context you use. This feature MUST be used only in class based components
    static contextType = AuthContext;

    // OLD way to access the context: (this is going to work anyway)
    /* render() {
        return (
            <AuthContext.Consumer>
                {authContext => {
                    return (
                        <button onClick={authContext.toggleAuth}>
                            {authContext.isAuth ? 'Logout' : 'Login'}
                        </button>
                    );
                }}
            </AuthContext.Consumer>
        );
    } */

    componentDidMount() {
        console.log('[Login.js] Context:', this.context);
    }

    render() {
        return (
            <button onClick={this.context.toggleAuth}>
                {this.context.isAuth ? 'Logout' : 'Login'}
            </button>
        );
    }
}

export default Login;