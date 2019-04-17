// Check the "routing--react-suspense" project where you can see the utility of React.lazy() introduced in React 16.6 to avoid implementing this HOC by yourself

// HOC to Lazily Load a component, known as well as Code Splitting
// This will make webpack to create an extra bundle (X.chunk.js) apart from the bundle.js so in this way the component get bundle in another file and is prepared to be loaded only when needed
// This means that you don't load reduntant code in advance
// This can be very useful in big apps where a component should be render conditionally and so improving the performance
// To check this in action check the "Network" window of the web browser

import React, { Component } from 'react';

const asyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount () {
      importComponent()
        .then(cmp => {
          this.setState({ component: cmp.default });
        });
    }

    render () {
      const C = this.state.component;
      return C && <C {...this.props} />;
    }
  };
};

export default asyncComponent;