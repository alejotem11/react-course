React Hooks
Feature that allows you to use functional components only, though you can still use class based components
Available only in React version 16.8 and higher

Project "react-hooks-sample":
useState() --> to manage the state. (Check the component/Todo.js or App.js files)
useEffect() --> for handling side effects like http calls, handling page event listeners and so on. Anything you would have run in componentDidMount(), componentDidUpdate() or componentDidUnmount(). (Check the component/Todo.js file)
useContext() --> to use context api in functional components (Check the component/Auth.js and App.js files)
useReducer() --> to bundle the logic for updating the state in one simple function (the same as the concept "reducer" in Redux) but is totally independent of Redux. (Check the component/Todo.js file)
useRef() --> to use references in functional components. (Check the component/Todo.js file)
useMemo() --> to avoid unnecessary re-rendering. (Check the component/Todo.js file)
Also you can create your own hooks --> this feature allows us to extract functionality out of a component, and share it across multiple components (Check the hooks/forms.js file and the component/Todo.js file where we used the hook)

To check the course project "burger-builder" making use of React Hooks check the project "burger-builder" in this folder