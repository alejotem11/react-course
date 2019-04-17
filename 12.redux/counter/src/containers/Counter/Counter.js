import React, { Component } from 'react';
import { connect } from 'react-redux'; // It is a function that returns a HOC

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
// import * as actionTypes from '../../store/actions/actions'; // --> We replace it with action creators
import * as actionCreators from '../../store/actions/index';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                {/* ----- WITHOUT USING REDUX ------
                <CounterOutput value={this.state.counter} />
                <CounterControl label="Increment" clicked={() => this.counterChangedHandler('inc')} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler('dec')} />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler('add', 5)} />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler('sub', 5)} /> */}
                
                {/* ----- USING REDUX ------ */}
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstractCounter} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(result => (
                        <li
                            key={result.id}
                            onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

// mapStateToProps --> The state we want to get
// mapDispatchToProps --> The actions we want to dispatch

// mapStateProps: How the state managed by redux should be maped to props you can use in this container. It recieves the state managed by redux and returns a JS Object that represents the map
// This function is executed by the react-redux package
const mapStateToProps = state => {
    return {
        // ctr: state.counter,
        // storedResults: state.results,
        // Because we used combinedReducers to combine the reducers counter.js and reults.js (see the index.js file), we now have the slice of the state managed by the counter reducer in the "ctr" variable and the one of the result reducer in the "res" variable
        ctr: state.ctr.counter, // mapping the value of the "counter" in our global state (managed by redux) to the property name "ctr" which I can then use it in the component
        storedResults: state.res.results,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        // onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        // onAddCounter: () => dispatch({ type: actionTypes.ADD, value: 5 }),
        // onSubstractCounter: () => dispatch({ type: actionTypes.SUBSTRACT, value: 5 }),
        // onStoreResult: (counter) => dispatch({ type: actionTypes.STORE_RESULT, counter }),
        // onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id }),
        // ************ Using Action Creators instead *****************
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(5)),
        onSubstractCounter: () => dispatch(actionCreators.substract(5)),
        onStoreResult: (result) => dispatch(actionCreators.storeResultAsync(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)),
    };
};

// export default connect(mapStateToProps)(Counter); // --->>>>> If you don't have any actions on your container
// export default connect(null, mapDispatchToProps)(Counter); --->>>>> If you have a container which only needs to dispatch actions but doesn't need a slice of the state
export default connect(mapStateToProps, mapDispatchToProps)(Counter);