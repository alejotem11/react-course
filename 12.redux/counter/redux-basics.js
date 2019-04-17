// Redux --> Third party library that works as a central place when you manage the entire state of your application
// When the user refreshes the page the Redux state is gone

const redux = require('redux'); // NodeJS syntax to import packages
const thunk = require('redux-thunk').default; // middleware to handle asynchronous code in Redux

// Middleware executed by redux in between the dispatching an action and the reducer
const logger = store => {
  return next => {
    return action => {
      console.log('[Middelware] Dispatching Action:', action);
      const result = next(action); // next() let the action continue to the reducer
      console.log('[Middleware] Updated State:', store.getState());
      return result;
    };
  };
};

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = { // It has not to be an object, but more often it is because you have more than one field on your global state most of the time
  counter: 0
};

// ******************** Reducer **********************
// CORE REDUX CONCEPT: Reducer is in charge of updating the state in an IMMUTABLE WAY!!!!!!!!!!!!!!1
// Recieves as argument the old state and return the new state
// Unlike the setState() method used in React to update the state, in the reducer we must use the spread operator (...) to not lose the other props of the state
// We set up the initialState as the default value whenever the "state" is undefined, which will be the case when it is creating the store where it will execute the reducer for the first time
// Reducers are able only to run SYNCHRONOUS code
const rootReducer = (state = initialState, action) => {
  if (action.type === 'INC_COUNTER') {
    // state.counter++; ----->>>>>>> !!!! You DON'T do that because this is not immutable
    return {
      ...state, // Copying the current state
      counter: state.counter + 1 // Overwriting the counter property once it is copied with the spread operator
    };
  }
  if (action.type === 'ADD_COUNTER') {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  return state;
};

// ******************** STORE ******************
// It stores entire application state
// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(logger, thunk)); // You can pass a list of middlewares as arguments in the applyMiddleware function
// console.log(store.getState());

// ******************* SUBSCRIPTION *********************
// It recieves a function as an argument that is executed whenever the state is updated (whenever an action reaches the reducer)
// It is typically set up right after the creation of the store so we get informed about any future dispatchers
store.subscribe(() => {
  console.log('[Subscription]', store.getState());
});

// ******************* ACTION CREATORS *******************
// Usefull for handling asynchronous code
// Only synchronous actions may edit the store
// Redux-Thunk blocks the original dispatching action to then dispatch another action once our asynchronous code is executed
// Asynchronous action creators are only possible due to redux-thunk and are caught in between to run our asynchronous code and then dispatch our synchronous action to change the state in the store
// The convention is to use the same name as the action identifier but in camel-case
// Action creators shouldn't prepare the State Update (data transforming logic) too much since the reducer is who should do that, so it is better to put the logic into the reducer
const addCounter = value => ({ type: 'ADD_COUNTER', value });
const addCounterAsync = value => {
  // return dispatch => { // we get the dispatch function due to redux-thunk
  //   setTimeout(() => { // Simulating a request to a server
  //     dispatch(addCounter(value));
  //   }, 2000);
  // };
  return (dispatch, getState) => { // Addtionally we can also get the getState function provided by redux-thunk in case we want to know the current state
    setTimeout(() => { // Simulating a request to a server
      const oldCounter = getState().counter;
      console.log('Old counter:', oldCounter);
      dispatch(addCounter(value));
    }, 2000);
  };
};

// ******************* Dispatching Action ****************
// The Action (JS Object) needs to have the "type" property where you define a unique identifier. The convention is to use all uppercase string
// Then, you can add any property that you want to that Action (JS Object)
// When you dispatch an action the reducer function is executed
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', value: 10 });
store.dispatch(addCounter(5));
store.dispatch(addCounterAsync(3));
// console.log(store.getState());