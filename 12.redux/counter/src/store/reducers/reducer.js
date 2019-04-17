// WARNING!!!!!!!!!!!!!!!!!!! We no longer use this reducer since we split this up into 2 separate files: counter.js and result.js

import * as actionTypes from './actions';

const initialState = {
  counter: 0,
  results: []
}

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
      return {
        ...state,
        counter: state.counter - action.value
      };
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        // results: state.push({...}) // --> This is mutating the original state
        results: state.results.concat({ // It is like push, but where push manipulates the original value, concat returns a new array which is the old array plus the argument you add to concat
          id: new Date(),
          value: action.result
        })
      };
    case actionTypes.DELETE_RESULT:
      /* // One way:
      const updatedArray = [...state.results]; // Since the elements of the array are objects, these objects are still pointing to the original ones, however you could remove the object from the cloned array without affecting the original objects
      newArray.splice(action.idx, 1);
      */

      // Another way:
      // const updatedArray = state.results.filter((r, index) => index !== action.idx);
      const updatedArray = state.results.filter(r => r.id !== action.resultElId); // filter() returns a new Array
      return {
        ...state,
        // results: state.results.splice(idx, 1) // --> This is mutating the original state
        results: updatedArray
      };
    default:
      return state;
  }
}

export default reducer;