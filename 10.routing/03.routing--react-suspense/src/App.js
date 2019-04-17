// For lazy loading check https://reactjs.org/docs/code-splitting.html
import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import User from './containers/User';
import Welcome from './containers/Welcome';

// Load the component only when needed:
// import Posts from './containers/Posts';
const Posts = React.lazy(() => import('./containers/Posts'));

class App extends Component {
  state = { showPosts: false }

  modeHandler = () => {
    this.setState(prevState => {return { showPosts: !prevState.showPosts };});
  }

  render() {
    return (
      // Using Suspense in components outside of a Router:
      // <>
      //   <button onClick={this.modeHandler}>Toggle Mode</button>
      //   {this.state.showPosts ? (
      //     <Suspense fallback={<div>Loading...</div>} >
      //       <Posts />
      //     </Suspense>
      //   ) : <User />}
      // </>


      <BrowserRouter>
        <React.Fragment>
          <nav>
            <NavLink to="/user">User Page</NavLink> |&nbsp;
            <NavLink to="/posts">Posts Page</NavLink>
          </nav>
          <Route path="/" component={Welcome} exact />
          <Route path="/user" component={User} />
          {/* <Route path="/posts" component={Posts} /> */}
          <Route path="/posts" render={() =>
            // If the module containing the component loaded lazyly is not yet loaded by the time it needs to be render, we must show some fallback content while we’re waiting for it to load - such as a loading indicator. This is done using the Suspense component.
            <Suspense fallback={<div>Loading...</div>} >
              <Posts />
            </Suspense>
          } />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
