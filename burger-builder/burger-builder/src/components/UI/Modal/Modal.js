import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

class Modal extends Component {

  // To check when component will update. Note that this component and its
  // children (OrderSummary) get updated where any of its props change. Since
  // its props are passed from the BurgerBuilder component it gets updated
  // always even though we are not showing it, so doesn't make sense to update
  // it every time
  componentWillUpdate() {
    // console.log('Modal will update');
  }

  // Here we ensure that we don't unnecesarily update this component and its
  // wrapped components (OrderSummary). If you used PureComponent instead, React
  // will check all the properties of this component (show, modalClosed,
  // children) but we only update the component when the [show] property changes
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show
      || nextProps.children !== this.props.children; // To be able to see the spinner while the axios request gets a response
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </>
    )
  }
}

export default Modal;