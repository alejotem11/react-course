import React, { Component } from "react";
import Transition from 'react-transition-group/Transition'; // Component to wrap what we want to animate to control the display of the elements inside of it and especially the animation of these elements

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>

        {/* // With the following approach (if the components were not using Transition) the Modal and Backdrop components are always present in our html file even though we used css properties to hide them when the modal is closed

        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        <Backdrop show={this.state.modalIsOpen} />

        To avoid that we must check the modalIsOpen state to determine if we should render the components, but once the modalIsOpen state is false the component is removed from the dom immediatly so we can not see the configured css animation when the modal is closed:

        {this.state.modalIsOpen && <Modal show closed={this.closeModal} />}
        {this.state.modalIsOpen && <Backdrop show />}
        <button className="Button" onClick={this.showModal}>Open Modal</button>

        To solve this issue we use the Transition component
        */}

        {/*
        Transition Component --> tells React to remove the element from the dom until the entire animation is over unlike using the approach above in the button 'Open Modal'

        The [in] prop of the Transition component determines whether the wrapped elements should be rendered or not
        The [timeout] (in ms) determines how long it takes to switch from the 4 states defined in the Transition component (ENTERING, ENTERED, EXITING, EXITED)
        */}

        <br />
        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        <Backdrop show={this.state.modalIsOpen} />
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <br />


        <button
          className="Button"
          onClick={() => this.setState(prevState =>
          ({ showBlock: !prevState.showBlock }))}>
          Toggle
        </button>

        <Transition
          in={this.state.showBlock}
          timeout={500}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log('onEnter')} // before the entering state
          onEntering={() => console.log('onEntering')} // entering state
          onEntered={() => console.log('onEntered')} // entered state
          onExit={() => console.log('onExit')} // before exiting state
          onExiting={() => console.log('onExiting')} // exiting state
          onExited={() => console.log('onExited')} // exited state
          >
          {/* The 'state' value is giving to us by the Transition component */}
          {/* {state => <p>{state}</p>} */}
          {state => (
            <div style={{
              backgroundColor: 'red',
              width: 100,
              height: 100,
              margin: 'auto',
              transition: 'opacity 1s ease-out',
              opacity: state === 'exiting' ? 0 : 1
            }} />
          )}
        </Transition>

        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
