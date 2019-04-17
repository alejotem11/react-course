import React from 'react';
import './FancyButton.css';
import logProps from '../hoc/LogProps';

// React components hide their implementation details, including their rendered
// output.Other components using FancyButton usually will not need to obtain a
// ref to the inner button DOM element.This is good because it prevents
// components from relying on each other’s DOM structure too much.

// Although such encapsulation is desirable for application - level components
// like FeedStory or Comment, it can be inconvenient for highly reusable “leaf”
// components like FancyButton or MyTextInput.These components tend to be used
// throughout the application in a similar manner as a regular DOM button and
// input, and accessing their DOM nodes may be unavoidable for managing focus,
// selection, or animations.

// Ref forwarding is an opt-in feature that lets some components take a ref they
// receive, and pass it further down (in other words, “forward” it) to a child.

// With the commented block below the error [TypeError: Cannot read property
// 'focus' of null] will be thrown
/* const FancyButton = props => (
    <button className="FancyButton">
        {props.children}
    </button>
); */

// React.forwardRef accepts a render function that receives props and ref
// parameters and returns a React node
const FancyButton = React.forwardRef((props, ref) => (
    <button
        ref={ref}
        className="FancyButton"
        onClick={props.click}>
        {/* {props.children} */}
        {props.label}
    </button>
));

// refs will not get passed through.That’s because ref is not a prop.Like key,
// it’s handled differently by React.If you add a ref to a HOC, the ref will
// refer to the outermost container component, not the wrapped component. This
// means that refs intended for our FancyButton component will actually be
// attached to the LogProps component, so we must use the React.forwardRef in
// our HOC Component to point the ref to our FancyButton Component
export default logProps(FancyButton);