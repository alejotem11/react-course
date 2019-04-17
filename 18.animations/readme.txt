Animation in React Apps
- You can use simple css animation but the problem appears when you want to show and hide some elements. These elements are always present in our html file even though we used css properties to hide them (opacity: 0, display: none, etc)
- You can use react-transition-group package to smoothly animate elements where they are added or removed from the dom

$ npm install --save react-transition-group

Alternatives to react-transition-group:
- react-motion
- react-move
- react-router-transition