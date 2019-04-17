import React from 'react';
// import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  // Transform an object of key-value pairs into an array of BurgerIngredients
  // where the value indicates how many ingredients I need and the key indicates
  // the type of ingredient. Watch the video [121 Calculating the Ingredient Sum
  // Dynamically] of the Udemy's React course
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    })) 
    //.reduce(callback, initialValue)
    .reduce((prevValue, currentValue) => prevValue.concat(currentValue), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

// withRouter HOC: Only direct components specified in the Route have access to the "history", "location", and "match" routing related properties. If you wanted to have access to these properties in one of the children of the component you could use the HOC "withRouter", so this component will get the props containing the information for the nearest loaded Route
// export default withRouter(burger);

export default burger;