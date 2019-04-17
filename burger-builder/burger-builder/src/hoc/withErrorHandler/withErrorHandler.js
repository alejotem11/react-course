import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    // componentDidMount is going to be called once the componentDidMount of the
    // WrappedComponent is executed, and since we are reaching out to the web in
    // the componentDidMount of the BurgerBuilder component (WrappedComponent)
    // and we are definig the interceptors here (in the componentDidMount of the
    // withErrorHandler Component), the interceptors for our axios object are
    // not going to be set. So to make sure to configure such interceptors
    // before the child components are rendered, we must use the
    // componentWillMount instead of the componentDidMount
    componentWillMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req; // Return the req config so the request can continue
      }, error => {
        this.setState({ error });
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error });
      });
    }

    // To prevent memory leaks
    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render () {
      return <>
        <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
          {this.state.error && this.state.error.message}{/* Short circuit */}
        </Modal>
        <WrappedComponent {...this.props} />
      </>
    }
  }
};

export default withErrorHandler;