import React from 'react';
import './Input.css';

const input = props => {
  let inputElement = null;
  const inputClasses = ["InputElement"];
  let validationError = null;
  if (props.invalid && props.touched) {
    inputClasses.push("Invalid");
    validationError = <p className="ValidationError">{props.errorMsg}</p>;
  }
  const inputClassesJoined = inputClasses.join(' ');

  switch (props.elementType) {
    case 'input':
      inputElement = <input
          className={inputClassesJoined}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />;
      break;
    case 'textarea':
      inputElement = <textarea
          className={inputClassesJoined}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />;
      break;
    case 'select':
      inputElement = <select
        className={inputClassesJoined}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>;
      break;
    default:
      inputElement = <input
          className={inputClassesJoined}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />;
      break;
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
};

export default input;