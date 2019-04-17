import React from 'react';
import { Link, Route } from 'react-router-dom';

import Users from './containers/Users';
const Pizza = React.lazy(() => import('./containers/Pizza'));

class App extends React.Component {
  render () {
    return (
      <div>
        <div>
          <Link to="/">Users</Link> | <Link to="pizza">Pizza</Link>
        </div>
        <div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Route path="/" exact component={Users} />
            <Route path="/pizza" component={Pizza} />
          </React.Suspense>
        </div>
      </div>
    );
  }
}

export default App;