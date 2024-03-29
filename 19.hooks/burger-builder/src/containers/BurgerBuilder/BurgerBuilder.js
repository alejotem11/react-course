import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const updatePurchaseState = () => {
    const ingredients = props.ings;
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((prevValue, currValue) => prevValue + currValue, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...props.ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (props.ings) {
    burger = <>
      <Burger ingredients={props.ings} />
      <BuildControls
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemoved}
        disabled={disabledInfo}
        purchasable={updatePurchaseState()}
        ordered={purchaseHandler}
        price={props.price}
        isAuth={props.isAuthenticated} />
    </>;
    orderSummary = <OrderSummary
      ingredients={props.ings}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={props.price} />;
  }

  return (
    <>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );

};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));