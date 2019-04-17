import React from 'react';
// import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition'; // To handle css classes or changing styles depending on the state

import './Modal.css';

const animationTiming = {
    enter: 400, // Defines the duration for adding this element
    exit: 1000 // Defines the duration for removing this element
};

const modal = (props) => {
    return (
        // ************** Without CSSTransition Component *******************
        // If you defined a timeout shorter than the animation you play you simply quit the animation before it ends
        /* 
        <Transition
            in={props.show}
            // timeout={400} --> With this approach the entering and exiting time will be the same
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit>
            {state => {
                const cssClasses = [
                    'Modal',
                    state === 'entering'
                        ? 'ModalOpen'
                        : state === 'exiting'
                        && 'ModalClosed'
                ];
                return (
                    <div className={cssClasses.join(' ')}>
                        <h1>A Modal</h1>
                        <button className="Button" onClick={props.closed}>Dismiss</button>
                    </div>
                )
            }}
        </Transition>
         */
        // ********************************************************************


        // ************************** CSSTransition ***************************
        // The CSSTransition component attaches some words to the class defined in the classNames property depending on the state
        // So if you defined the classNames="fade-slide" the resulting classes would be:
        // - fade-slide-enter --> This class will be removed after 1 frame (usefull for starting configuration)
        // - fade-slide-enter-active
        // - fade-slide-exit --> This class will be removed after 1 frame
        // - fade-slide-exit-active
        // The following classes are used for the first time something is rendered to the DOM
        // - fade-slide-appear
        // - fade-slide-appear-active
        <CSSTransition
            in={props.show}
            // timeout={400} --> With this approach the entering and exiting time will be the same
            timeout={animationTiming}
            mountOnEnter // To render it in the DOM when needed
            unmountOnExit // To remove it from the DOM when needed
            // classNames="fade-slide" // --> Defines trunk of the css classes that will be added to the wrapped element
            classNames={{
                enter: '', // --> In this case you don't have to define it
                enterActive: 'ModalOpen',
                exit: '', // --> In this case you don't have to define it
                exitActive: 'ModalClosed',
                appear: '', // --> In this case you don't have to define it
                appearActive: '' // --> In this case you don't have to define it
            }}
            >
            <div className="Modal">
                <h1>A Modal</h1>
                <button className="Button" onClick={props.closed}>Dismiss</button>
            </div>
        </CSSTransition>
    );
}

export default modal;