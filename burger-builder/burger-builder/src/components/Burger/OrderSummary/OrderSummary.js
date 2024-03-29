import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

// This could be a functional component, doesn't have to be a class
class OrderSummary extends Component {
  
  // componentWillUpdate() {
  //   console.log('OrderSummary will update');
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey =>
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>);
    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnType="Danger"
          clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button
          btnType="Success"
          clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </>
    );
  }
}

export default OrderSummary;