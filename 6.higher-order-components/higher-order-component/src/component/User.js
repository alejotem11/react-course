import React from 'react';
import addSomeTextAtTheEnd from '../hoc/HigherOrderComponent';

// class User extends React.Component {
//     render() {
//         return (
//             <h1>Bienvenido {this.props.name}</h1>
//         );
//     }
// }
// export default addSomeTextAtTheEnd(User, 'Some text here');

const user = props => (
    <h1>Bienvenido {props.name}</h1>
);
export default addSomeTextAtTheEnd(user, 'Some text here');