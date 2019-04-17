import React from 'react';
import Transition from 'react-transition-group/Transition';

import './Backdrop.css';

const backdrop = (props) => {
    return (
        <Transition
            in={props.show}
            timeout={1} // It must be set if you use mountOnEnter and unmounOnExit
            mountOnEnter
            unmountOnExit>
            {state => {
                const cssClasses = [
                    'Backdrop',
                    state === 'entering'
                    ? 'BackdropOpen'
                    : state === 'exiting'
                    && 'BackdropClosed'
                ];
                return <div className={cssClasses.join(' ')}></div>;
            }}
        </Transition>
    );
}

export default backdrop;