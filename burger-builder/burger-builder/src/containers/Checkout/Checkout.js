import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  // We now manage the state with Redux
  /* state = {
    ingredients: null,
    totalPrice: 0
  } */

  // *************** Without using Redux *****************
  // We use componentWillMount instead of componentDidMount, so before we render the child components we set the appropriate state
  /* 
  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // e.i. param = ['salad', 1]
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1]; // +param[1] --> Converting to a number
      }
    }
    this.setState({ ingredients, totalPrice: price });
  }
   */
  // ******************************************************

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      // const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      const purchasedRedirect = this.props.purchased && <Redirect to="/" />; // Short-circuit operator
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
          {/* ************* Without using Redux **************
        // We use "render" instead of "component" to be able to pass props (ingredients and price) to the ContactData component. But since we don't use "component" we don't have access to the Route related props (history, match, location). To fix that we pass the props argument in the arrow function used in "render" and pass it to the component
        <Route path={this.props.match.path + '/contact-data'} render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props} />
          )} />
        *************************************************/}
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);