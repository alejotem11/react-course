To test your react App run:
$ npm test

Tools:
- Jest (included when you use create-react-app) --> Executes tests and provides validation library --> https://jestjs.io/docs/en
- Enzyme --> "Simulates" the React App (mount components, allows you to dig into the DOM) --> https://airbnb.io/enzyme/docs/api/
	Additionally we need to install some dependencies of Enzyme to work appropriatly with React and Jest:	
	$ npm install enzyme react-test-renderer enzyme-adapter-react-16 --save-dev

To see testing in action (in the [burger-builder] project):
- Testing components: check the NavigationItems.test.js file
- Testing containers: check the BurgerBuilder.test.js file
- Testing Redux: the main goal is to test the reducers. Testing the reducers is super easy especially if you followed the pattern of not putting to much logic in the action creators, since they are just simple js functions returning somenthing. Check the reducers/auth.test.js file
 