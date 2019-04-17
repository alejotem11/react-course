The react-complete-guide project use some of the React concepts (just like lab)
The burger-builder project is an example of a real app (including authentication). If you want to see this project making use of React hooks check the project ""


*************************
To install a react project from scratch:

Install create-react-app globally to bootstrap react apps:
npm install -g create-react-app
yarn global create-react-app

Run the command:
create-react-app [projectname]
https://github.com/facebookincubator/create-react-app
This will install the libraries react, react-dom and react-scripts and create
a guide project to start using react

Use the Class based components (Stateful components) for:
- Keeping state
- Lifecycle hooks
- References

If you want to validate the types of the props pass to a React Component you
can use the package "prop-types" ($ yarn add prop-types - $ npm install prop-types --save)
It must be implemented only in class based components
To see an example of this library check the Person.js component in the react-complete-guide folder

PureComponent & React.memo():
If you want to re-render your component whenever your props really change and not all the time when its parent re-renders it
PureComponent avoids you to implement the shouldComponentUpdate lifecycle hook to check manually every single property for changes
Previously to React 16.6 you must use class based component to take advantage of this feature, but with React 16.6 you can also
optimized functional components with the use of the methods React.memo(your_functional_component). To see this in action check
the profile component in the react-complete-guide folder
// NOTE: You should only use PureComponent or React.memo() if you know that
// updates might not be required, because you could prevent the updates of child
// components when you intend to do that if the parent is a PureComponent. On
// the other hand you could get a performance hit becuase PureComponents or
// React.memo() compare all the old props and state to the new ones