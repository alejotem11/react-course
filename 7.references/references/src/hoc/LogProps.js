import React from 'react';

const logProps = (WrappedComponent) => {
    class LogProps extends React.Component {
        componentDidMount() {
            console.log('Props:', this.props);
        }

        render() {
            // return <WrappedComponent {...props} />
            const {forwardedRef, ...rest} = this.props;
            return <WrappedComponent ref={forwardedRef} {...rest} />;
        }
    }
    // return LogProps;

    // Note the second param "ref" provided by React.forwardRef.
    // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
    // And it can then be attached to the Component.
    return React.forwardRef((props, ref) =>
        <LogProps {...props} forwardedRef={ref} />);
};

export default logProps;