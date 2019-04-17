// Sample of a component using React Hooks

// useState --> to manage the state
// useEffect --> for handling side effects like http calls, handling page event listeners and so on. Anything you would have run in componentDidMount(), componentDidUpdate() or componentDidUnmount()
// useReducer --> to bundle the logic for updating the state in one simple function (the same as the concept "reducer" in Redux) but is totally independent of Redux
// useRef --> to use references in functional components
// useMemo --> to avoid unnecessary re-rendering
import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './List';
import { useFormInput } from '../hooks/forms';

const todo = () => {
  // The useState() function returns an array of 2 positions:
  // [0] --> Latest state value
  // [1] --> A function given to us by React to manipulate the state
  // The initial state is passed in as argument
  // You MUST use hooks (useState(), useEffect(), useContext(), useReducer(),
  // useRef(), ...) at the top level of your functional component

  const [todoName, setTodoName] = useState(''); // Destructuring an array
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoList, setTodoList] = useState([]); // we no longer used the useState to manipulate the todoList, we use the useReducer instead

  // ************ Using a single object instead of separate states *************
  // You could manage both of the state in one single object, but is recommended
  // to separate them to change them independently and focus on one state at a 
  // time since that unlike the setState() method used in the class based
  // components, which took an object and merge it with the existing state, the
  // functions created by the hook to update the state will not merge whatever
  // you pass in with the old state, it will simply be replaced with the new one
  /*
  const [todoState, setTodoState] = useState({
    todoName: '',
    todoList: []
  });
  const inputChangeHandler = (event) => {
    setTodoState({
      todoName: event.target.value,
      todoList: todoState.todoList
    });
  };
  const todoAddHandler = () => {
    setTodoState({
      todoName: todoState.todoName,
      todoList: todoState.todoList.concat(todoState.todoName)
    });
  };
  */

  const todoInput = useFormInput(); // The advantage of using our own hook is that now we can use it where we want. Let's say we want to check the validity of another input in another component we just need to use the hook for that

  const todoInputRef = useRef(); // We no longer use todoInputRef, instead we use our own hook "todoInput"

  // React will pass in the arguments (state and action) automatically for us
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.id);
      default:
        return state;
    }
  };

  // The useReducer returns an array of two elements:
  // [0] --> state
  // [1] --> dispatch fucntion
  const [todoList, dispatch] = useReducer(
    todoListReducer, // reducer function
    [], // initial state
  );


  // ***************************************************************************

  // You could think that you can execute your code right here, without using
  // the useEffect() hook but the problem with calling it here would be that
  // we call it inside of the render cycle and that is bad for performance
  // reasons because of the way React works and could lead to unexpected results
  // The useEffect() takes the code you write there and makes sure that this
  // code executes at the right time just after the render cycle finishes so
  // this can run in a high performance way and the UI data will be correct
  // The useEffect() hook not only runs once, but it runs after every renders
  // cycle
  // Anything you would have run in componentDidMount(), componentDidUpdate(),
  // or componentDidUnmount() using class based component, should go in the
  // useEffect() hook

  // React Hooks and Component Lifecycle Equivalent:
  // - componendDidMount()
  //      Pass an empty array as the second argument to useEffect() to run only
  //      the callback on mount only
  // - componentDidUpdate()
  //      Pass an array of the variables you want to watch for changes, and only
  //      when they change the callback will be executed
  // - componentWillUnmount()
  //      Return a function and an empty array as the second argument of the
  //      useEffect() hook, hence the function returned will be called before
  //      unmounting
  // - componentWillMount()
  //      Just put the code you want to run before the return statement
  //
  /* - componentDidMount() and componentWillUnmount:
    useEffect(() => {
      // ... code to be executed on mount (componentDidMount)
      return () => {
        // ... code to be executed before unmounting (componentWillUnmount)
      };
    }, []);
  */

  useEffect(() => {
    // Code to be executed when this component loads for the first time
    axios.get('https://react-hook-test.firebaseio.com/todos.json')
      .then(result => {
        const todoData = result.data;
        const todos = Object.keys(todoData)
          .map(key => ({
            id: key,
            name: todoData[key].name
          }));
        // setTodoList(todos); // This will update the state, hence react re-
        // renders the UI and we enter in an infinite loop if we don't pass
        // in the second argument of the useEffect hook

        dispatch({
          type: 'SET',
          payload: todos
        });
      })
      .catch(console.log);
    
    // You can return a function which will be executed by react as a cleanup BEFORE it applies the effect of your main code (define just below the return statement) except for the first time
    // return () => {
    //   console.log('Cleanup');
    // };
  },
  // [todoName] // --> The code will be executed whenever the todoName changes
  [] // --> The code will be executed only on mounting this component
  );

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  // You can use multipe useEffect()
  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMoveHandler);
  //   return () => { // Cleanup
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //   }
  // },
  // [] // Equivalent to componentDidMount() and componentWillUnmount()
  // );

  /* // Handling the submittedTodo state. We no longer use this because we dispatch the ADD action directly in the todoAddHandler
  useEffect(() => {
    if (submittedTodo) {// Because we don't want this to run when the component did mount for the first time
      // setTodoList(todoList.concat(submittedTodo));
      dispatch({
        type: 'ADD',
        payload: submittedTodo
      })
    }
  }, [submittedTodo]);
  */

  const inputChangeHandler = (event) => {
    // the function used to change the state 
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    // concat() always returns a new array so the old array is replaced with
    // this one
    // const todoNameRef = todoInputRef.current.value; // the "current" property of the ref holds the actual html element reference
    const todoNameFromHook = todoInput.value;
    axios
      .post('https://react-hook-test.firebaseio.com/todos.json', {
        // name: todoName
        // name: todoNameRef
        name: todoNameFromHook
      })
      .then(res => {
        setTimeout(() => { // Simulating a delay on the server
          const todoItem = {
            id: res.data.name,
            // name: todoName
            // name: todoNameRef
            name: todoNameFromHook
          };
          // *************** Issue with useState *************
          // Issue using the setTodoList: if we submit a todo immediately after another todo (click the button more than once quickly right before the first todo is submitted), the list of todos only shows one item added instead of showing all the todos submitted because all the variables used here are locked down until it finishes executing (JavaScript Closures), so the todoList is not going to reflect the real state
          // setTodoList(todoList.concat(todoItem));

          // ********** Alternatives to solve the issue  ****************
          // 1. Don't use variables different of local variables. For more info check the [Lecture 266 - State and Effects Gotchas] of the Udemy's React Course:
          // setSubmittedTodo(todoItem);
          
          // 2. (The best approach) Use the useReducer hook instead (dispatching an action). This will work becuase by using dispatch we pass this on to a function (todoListReducer) which will always recieve the latest state when it runs thanks to React and then returns the new state. This is the best solution because we don't have to create an extra state (submittedTodo) and an extra effect to handle this state. For more info check the [Lecture 468 - useReducer() vs useState()] of the Udemy's React Course:
          dispatch({
            type: 'ADD',
            payload: todoItem
          });
        }, 3000);
      })
      .catch(console.log);
  };

  const todoRemoveHandler = todoId => {
    axios.delete(`https://react-hook-test.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({
          type: 'REMOVE',
          id: todoId
        });
      })
      .catch(console.log);
  };

  const inputValidationHandler = event => {
    if (event.target.value === '') {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  return (
    <React.Fragment>
      {/* <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      // value={todoState.todoName}
      /> */}
      {/* The same input element above but using useRef:
      <input
        type="text"
        placeholder="Todo"
        ref={todoInputRef} // A reference to this input element is stored in the variable "todoInputRef"
        onChange={inputValidationHandler}
        style={{backgroundColor: inputIsValid ? 'transparent' : 'red'}}
      />
      */}
      {/* The same input element above but using our own hook */}
      <input
        type="text"
        placeholder="Todo"
        onChange={todoInput.onChange}
        value={todoInput.value}
        style={{ backgroundColor: todoInput.validity ? 'transparent' : 'red' }}
      />
      
      <button
        type="button"
        onClick={todoAddHandler}>
        Add
    </button>

      {/* The todoList is rendered in the List.js file
      <ul>
        {todoList.map(todo => (
          <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>
        ))}
      </ul>
      */}
      {/* ************** useMemo hook ***************
      // wihout using useMemo hook, when we typed something in the input text the list gets re-rendered even though the list hadn't been changed
      useMemo has to return a value (it doesn't have to be jsx code)
      Memoization is all about caching values if their inputs don't change
      The second argument of the useMemo defines which inputs we want React to watch out for, so whenever one of the variables passed in change, a new value should be generated
      In the following example, only when the input 'todoList' changes, List component will be re-render
      */}
      {useMemo(() => <List items={todoList} onClick={todoRemoveHandler} />, [todoList])}
      
    </React.Fragment>
  );
}

export default todo;