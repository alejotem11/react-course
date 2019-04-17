import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends React.Component {
  // We now manage the state with Redux
  // state = {
  //   orders: [],
  //   loading: true
  // }

  // ************* Without Redux **********************
  /* async componentDidMount () {
    try {
      const res = await axios.get('/orders.json');
      const fetchedOrders = [];
      // console.log(response.data);
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      this.setState({ orders: fetchedOrders });
    } catch (error) {
      console.log('Something went wrong');
    } finally {
      this.setState({ loading: false });
    }
  } */

  componentDidMount () {
    this.props.onFetchOrders(this.props.token);
  }

  render () {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price} />
      ));
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));