import React from 'react';

// Because webpack is going to build our entire app in different optimized
// assests, the path of the image needs to be dynamic, instead of copying the
// path of the image directly into the img element
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;