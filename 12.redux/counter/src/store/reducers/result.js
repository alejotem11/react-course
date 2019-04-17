// Reducer in charge of managing the "results" state

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
  // Unlike the setState() method from React, the object returned in the reducer is not merged so if you don't want to lose the props you should clone the object with the spread operator (...state) or making use of Object.assign({}, state)
  switch (action.type) {
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