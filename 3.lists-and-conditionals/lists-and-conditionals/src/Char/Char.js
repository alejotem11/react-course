import React from 'react';
import './Char.css';

const char = props => (
    <div
        className="Char"
        onClick={props.onClick}>
        <p>{props.letter}</p>
    </div>
);

export default char;