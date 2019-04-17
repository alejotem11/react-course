import React from 'react';

export default React.createContext({ // The value passed in can be anything (boolean, number, string, object, etc.)
  isAuth: false,
  toggleAuth: () => { }
});