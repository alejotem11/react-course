import React from 'react';

// Check the \8.context-api\context-api project

const authContext = React.createContext({
    status: false,
    login: () => {}
});

export default authContext;