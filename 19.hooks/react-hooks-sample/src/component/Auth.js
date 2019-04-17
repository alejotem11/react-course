import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const auth = props => {
    // Remember that in class based components we could get access to the context just declaring a static constant as follows (check the 8.context-api\context-api project):
    // static contextType = AuthContext;
    const auth = useContext(AuthContext);
    
    return <button onClick={auth.login}>Log in!</button>;
};

export default auth;