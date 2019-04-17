import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.css';

// This component, despite of being a class based component, is located under the components folder instead of the containers folder because this component is not intended to manage any state. This is a class based component just because it needs to implement the prop-types package
class BurgerIngredient extends Component {
  render () {
    let ingredient = null;
    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case 'bread-top':
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case 'meat':
        ingredient = <div className={classes.Meat}></div>;
        break;
      case 'bacon':
        ingredient = <div className={classes.Bacon}></div>;
        break;
      case 'cheese':
        ingredient = <div className={classes.Cheese}></div>;
        break;
      case 'salad':
        ingredient = <div className={classes.Salad}></div>;
        break;
      default:
        ingredient = null;
        break;
    }
    return ingredient;
  }
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;