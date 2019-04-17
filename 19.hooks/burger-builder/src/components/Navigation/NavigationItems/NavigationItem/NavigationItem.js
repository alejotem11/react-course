import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItems = props => (
  <li className={classes.NavigationItem}>
    {/* active class attached by NavLink to the links that match the path (the "to" prop) are not going to work as expected if CSS module is configured because of the generated unique class names, so we must set up the active class via "activeClassName" property */}
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}>
        {props.children}
    </NavLink>
  </li>
);

export default navigationItems;