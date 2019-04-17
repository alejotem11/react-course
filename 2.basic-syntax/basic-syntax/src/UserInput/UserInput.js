import React from 'react';

const userInput = props => {
    const inlineStyle = {
        margin: 'auto',
        width: '60%',
        background: '#eee'
    };
    return (
        <div style={inlineStyle}>
            <input type="text" onChange={props.changed} value={props.username}></input>
        </div>
    )
};

export default userInput;