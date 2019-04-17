import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

const app = props => {
  
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  const isAuthenticated = props.isAuthenticated;
  return (
    <div>
      <Layout>
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            {isAuthenticated && <Route path="/logout" component={Logout} />}
            {isAuthenticated && <Route path="/checkout" component={Checkout} />}
            {isAuthenticated && <Route path="/orders" component={Orders} />}
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </React.Suspense>
      </Layout>
    </div>
  );
};

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
