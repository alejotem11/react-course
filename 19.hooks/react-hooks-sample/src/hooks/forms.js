// ************* Example of creating a custom hook ************

import { useState } from 'react';

// Your own hooks should start with the prefix "use"
export const useFormInput = () => {
    // Note that we are using the state (useState hook) in our own hook. This is possible because there is only one state management container for the entire React App, so we can actually hook into the state from:
    // - class based components
    // - functional components with hooks
    // - our own hooks
    const [value, setValue] = useState(''); // Value of the input
    const [validity, setValidity] = useState(false);

    const inputChangeHandler = event => {
        setValue(event.target.value);
        if (event.target.value.trim() === '') {
            setValidity(false);
        } else {
            setValidity(true);
        }
    };
    return { // You can return anything (a number, string, array, object,...)
        value,
        onChange: inputChangeHandler,
        validity
    };
};