import React, { Component } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';

// The React Context API allows us to set global variables that can be read in
// other components without passing around props. If you are using React 16.6
// you can declare this in a js file (in this case the auth-context.js file):
/* export const AuthContext = React.createContext({
  isAuth: false,
  toggleAuth: () => {}
}); */
import AuthContext from './auth-context';

class App extends Component {
  state = {
    isAuth: false
  };

  toggleAuth = () => {
    this.setState(prevState => {
      return {
        isAuth: !prevState.isAuth
      };
    })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          toggleAuth: this.toggleAuth
        }}
      >
        <Login />
        <Profile />
      </AuthContext.Provider>
    );
  }
}

export default App;
