// Higher Order Component: this is not going to introduce another html element
//import React from 'react'; // You should import it only when you use JSX

// The same functionality can be achieved with the <> operator (known as a
// fragment) instead of having to create a new component like this one
const aux = props => props.children;

export default aux;