import * as actionTypes from '../actions/actionTypes';

const initialState = {
   ingredients: null,
   // ingredients: {
   //    salad: 0,
   //    bacon: 0,
   //    cheese: 0,
   //    meat: 0,
   // },
   totalPrice: 4, // In a real app you should calculate the price in the server, to avoid the client could manipulate the price
   error: false,
   building: false
};

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
         return {
            ...state, // This is not copying nested objects
            ingredients: {
               ...state.ingredients, // Fixing the problem of cloning the state above
               [action.ingredientName]: state.ingredients[action.ingredientName] + 1 // Dynamically overwrite a property in a given JS Object
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
         };
      case actionTypes.REMOVE_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            building: true
         };
      case actionTypes.SET_INGREDIENTS:
         return {
            ...state,
            // ingredients: action.ingredients,
            ingredients: { // If we just set the ingredients as above the page ingredients are painted in the same order as they are on Firebase
               salad: action.ingredients.salad,
               bacon: action.ingredients.bacon,
               cheese: action.ingredients.cheese,
               meat: action.ingredients.meat
            },
            totalPrice: 4,
            error: false,
            building: false
         };
      case actionTypes.FETCH_INGREDIENTS_FAILED:
         return {
            ...state,
            error: true
         };
      default:
         return state;
   }
};

export default reducer;