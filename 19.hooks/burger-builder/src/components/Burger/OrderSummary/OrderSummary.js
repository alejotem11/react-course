import React from 'react';
import Button from '../../UI/Button/Button';

export default (({
  ingredients,
  price,
  purchaseCanceled,
  purchaseContinued
}) => {
  const ingredientSummary = Object.keys(ingredients)
    .map(igKey =>
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
      </li>);
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        btnType="Danger"
        clicked={purchaseCanceled}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={purchaseContinued}>CONTINUE</Button>
    </>
  );
});