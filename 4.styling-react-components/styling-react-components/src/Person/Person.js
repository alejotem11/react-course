import React from 'react';
import Radium from 'radium';

// import './Person.css';
import classes from './Person.css'

const Person = props => {
    const style = {
        '@media (min-width: 500px)': { // Using Radium
            width: '450px',
            backgroundColor: 'blue'
        }
    };
    return (
        <div className={classes.Person}>
            {/* <div className='Person' style={style}> --> This would be the way if we were using Radium*/}
            <p onClick={props.click}>I'm {props.name} and I am {props.age}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};

export default Radium(Person);