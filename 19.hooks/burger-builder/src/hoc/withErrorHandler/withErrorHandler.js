import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {

  return props => {
    const [error, clearError] = useHttpErrorHandler(axios); // You can name the extracted elements however you want, you don't have to use the name you use in your custom hook function
    return (
      <>
        <Modal show={error} modalClosed={clearError}>
          {error && error.message}{/* Short circuit */}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };

};

export default withErrorHandler;