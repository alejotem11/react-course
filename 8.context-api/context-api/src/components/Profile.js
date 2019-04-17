import React, {Component} from 'react';

import AuthContext from '../auth-context';

/* const profile = props => (
    <AuthContext.Consumer>
        {authContext => {
            return (
                <h1>{authContext.isAuth ? 'You are logged in' : 'Not logged in'}</h1>
            );
        }}
    </AuthContext.Consumer>
);

export default profile; */

export default class Profile extends Component {
    static contextType = AuthContext;

    componentDidMount() {
        console.log('[Profile.js] Context:', this.context);
    }

    render() {
        return <h1>{this.context.isAuth ? 'You are logged in' : 'Not logged in'}</h1>;
    }
}