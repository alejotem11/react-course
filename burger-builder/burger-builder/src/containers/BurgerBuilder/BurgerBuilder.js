import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

// We need to export the BurgerBuilder component to be able to test it, because we are exporting by default a HOC (connect) provided by Redux, and we don't want this component to get connected to the Redux store in testing
export class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...};
  // }

  state = {
    // ingredients: null, // --> Managed by Redux
    // totalPrice: 4, // --> Managed by Redux
    // purchasable: false,
    purchasing: false,
    // loading: false,
    // error: false,
  }

  /* async componentDidMount() { // --> Async code executed in the initIngredients action creator (store/actions/burgerBuilder.js)
    try {
      const response = await axios.get('/ingredients.json');
      if (response && response.data) {
        this.setState({ ingredients: response.data });
      }
    } catch (error) {
      this.setState({ error: true });
    }
  } */

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchaseState = () => {
    const ingredients = this.props.ings;
    const sum = Object.keys(ingredients) // ["salad", "bacon", "cheese", "meat"]
      .map(igKey => ingredients[igKey])
      .reduce((prevValue, currValue) => prevValue + currValue, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    // this.props.history.push() allows us to switch the page and push a new page on to the stack of pages
    this.props.history.push('/checkout');
    
    // ******* Without using Redux we passed the ingredients via query params ******
    /*
    const queryParams = [];
    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice); // In a real app you should calculate the price in the server, to avoid the client could manipulate the price
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
    */
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    if (this.props.ings) {
      burger = <>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          //ingredientAdded={this.addIngredientHandler}
          //ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.props.onIngredientAdded} // The "ingName" argument is already passed to the function in the BuildControls component (through the [ctrl.type] variable)
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={this.updatePurchaseState()} // We execute the function updatePurchaseState() making use of the () operator
          ordered={this.purchaseHandler}
          price={this.props.price}
          isAuth={this.props.isAuthenticated} />
      </>;
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price} />;
    }
    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

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
// export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);