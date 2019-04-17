Redux --> Third party library that works as a central place when you manage the entire state of your application
When the user refreshes the page the Redux state is gone

Installation:
$ npm install --save redux
$ npm install --save react-redux --> To be able to connect redux to react in our React App

************ Basics ***********
Check the "redux-basics.js" file in the "redux--01-start" project. To see it in action:
$ node redux-basics.js --> Note that redux is nothing to do with react. It can be executed with node

Implementing Redux in React
- The store should be created before or when our application starts. See the index.js file
- The reducers could have very complex code for different types of actions, therefore we typically store that logic into their own files.
  You will often see that there is a "store" folder in the "src" directory where you defined such reducers
- Connecting the React Component to Redux: Use the 'connect' function of react-redux package where you want to make use of the store. See the Counter.js file

************ Redux DevTools *************
Add the Redux DevTools extension to Chrome to be able to check the Redux state
To check how to enable it in your project see the index.js file

*********** Handling Asynchronous Code ***************
- Declare the required Action Creators (see the actions.js file)
- Install the package "redux-thunk":
	$ npm install --save redux-thunk
	This is a library which adds a middleware to your project which allows the action creators to not return the action itself but return a function which eventually dispatch an action
redux-saga --> An alternative to redux-thunk