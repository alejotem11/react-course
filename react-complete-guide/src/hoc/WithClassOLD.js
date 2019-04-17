// See the approach of withClass.js to add extra functionality to the wrapped
// components

import React from 'react';

const withClass = props => ( // Returning JSX Code
    <div className={props.classes}>
        {props.children}
    </div>
);

export default withClass;