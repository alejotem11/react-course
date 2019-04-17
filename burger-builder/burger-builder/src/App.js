import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';

// ***************** Lazy Loading *************** //
// Load the component only when needed: (check the 10.routing\03.routing--react-suspense project)
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Logout from './containers/Auth/Logout/Logout';
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    return (
      <div>
        <Layout>
          {/* If the module containing the component loaded lazyly is not yet loaded by the time it needs to be render, we must show some fallback content while we’re waiting for it to load - such as a loading indicator. This is done using the Suspense component. */}
          <React.Suspense fallback={<Spinner />}>
            <Switch>
              {/* Using component property instead of render in the following lines throw the error "Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`"
              That is due to the version of the react-router-dom. This will be fixed in react-router-dom version 4.4+
              In this project we used the version 4.4.0-beta.6 to solve the problem because using render prop instead breaks some routers */}
              {isAuthenticated && <Route path="/logout" component={Logout} />}
              {isAuthenticated && <Route path="/checkout" component={Checkout} />}
              {isAuthenticated && <Route path="/orders" component={Orders} />}
              {/* {isAuthenticated && <Route path="/logout" render={() => <Logout />} />}
              {isAuthenticated && <Route path="/checkout" render={() => <Checkout />} />}
              {isAuthenticated && <Route path="/orders" render={() => <Orders />} />} */}
              <Route path="/auth" component={Auth} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" /> {/* --> Redirect to root any path that doesn't match any of the Routes defined */}
            </Switch>
          </React.Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

// connect() is breaking the Routing, so we need to make use of the withRouter HOC make the App component able to recieve the Route props
// export default connect(null, mapDispatchToProps)(App);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
