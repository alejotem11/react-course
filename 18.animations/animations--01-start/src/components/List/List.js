import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup'; // To animate lists
import CSSTransition from 'react-transition-group/CSSTransition';

import './List.css';

class List extends Component {
    state = {
        items: [1, 2, 3]
    }

    addItemHandler = () => {
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(prevState.items.length + 1)
            };
        });
    }

    removeItemHandler = (selIndex) => {
        this.setState((prevState) => {
            return {
                items: prevState.items.filter((item, index) => index !== selIndex)
            };
        });
    }

    render () {
        const listItems = this.state.items.map( (item, index) => (
            // If we plan on using TransitionGroup we must wrap each child element with Transition or CSSTransition
            // The TransitionGroup component wrapping each of this elements set the "in" property automatically
            <CSSTransition
                key={index}
                classNames="fade"
                timeout={600}
            >
                <li
                    // key={index}
                    className="ListItem"
                    onClick={() => this.removeItemHandler(index)}>{item}</li>
            </CSSTransition>
        ) );

        return (
            <div>
                <button className="Button" onClick={this.addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                {/* 
                <ul className="List">
                    {listItems}
                </ul>
                 */}
                 {/* If you don't define the "component" prop in the TransitionGroup component, by default it renders a div in this place */}
                 <TransitionGroup
                    component="ul"
                    className="List">
                     {listItems}
                 </TransitionGroup>
            </div>
        );
    }
}

export default List;