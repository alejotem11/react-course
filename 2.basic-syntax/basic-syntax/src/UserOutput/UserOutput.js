import React from 'react';
import './UserOutput.css';

const userOutput = props => (
    <div className="UserOutput">
        <p>Hello {props.username}</p>
        <p>This is the other paragraph</p>
    </div>
);

export default userOutput;