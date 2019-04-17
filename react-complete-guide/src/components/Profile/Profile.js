import React from 'react';

const profile = props =>
  <div>
    <h1>Dummy Profile</h1>
    <h2>Bienvenido {props.name}</h2>
    <p>This is a dummy profile created to see the React.memo() method in action</p>
  </div>;

// Using React.memo is equivalent to extend the class PureComponent, but in
// functional components, so the component will re-render only when the props
// really change and not all the time when its parent re-renders it
// Additionally you can pass a function as argument in order to decide to re-render only when specific props have changed: i.e.:
/* 
export default React.memo(profile, (prevProps, nextProps) => {
  // Re-renders the profile component only when the prop name changes
  return prevProps.name === nextProps.name;
});
 */
export default React.memo(profile);