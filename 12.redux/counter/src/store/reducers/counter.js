// Reducer in charge of managing the "counter" state

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  counter: 0
}

// The reducer function has to run syncronously
const reducer = (state = initialState, action) => {
  // Unlike the setState() method from React, the object returned in the reducer is not merged so if you don't want to lose the props you should clone the object with the spread operator (...state) or making use of Object.assign({}, state)
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state, // Bear in mind that this is not cloning the nested objects or arrays
        counter: state.counter + 1
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.value
      };
    case actionTypes.SUBSTRACT:
      // return {
      //   ...state,
      //   counter: state.counter - action.value
      // };
      // Just an alternative to use a function of the utility but it is up to you if you choose to do in this way or pass the object directly
      return updateObject(state, { counter: state.counter - action.value });
    default:
      return state;
  }
}

export default reducer;