import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; // To connect the Redux store to our React App
import thunk from 'redux-thunk'; // middelware to handle asynchronous code in Redux

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import reducer from './store/reducer'; --> We split this up into two separate files: counter.js and result.js
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({ // Merging the reducers into one reducer
  ctr: counterReducer,
  res: resultReducer
});

// Middleware executed by redux in between dispatching an action and the reducer
const logger = store => {
  return next => {
    return action => {
      console.log('[Middelware] Dispatching Action:', action);
      const result = next(action); // This let the action continue to the reducer
      console.log('[Middleware] Updated State:', store.getState());
      return result;
    };
  };
};

// Enabling Redux DevTools on Chrome (Advance configuration --> when you use more middlewares):
// if the variable __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ is not available we take the default compose provided by Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Enabling Redux DevTools on Chrome (Basic configuration --> when you don't have any middleware):
// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// const store = createStore(rootReducer, applyMiddleware(logger)); // --> If we don't use Redux DevTools
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
