import React, { Component } from 'react';
// NavLink is very similar to Link but it has some extra props that allow us to define some style to the active link
// Switch tells the React Router to only load the first Route that matches from a given set of Routes
// Redirect to redirect requests
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    };

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* anchor tags reload the entire page causing to lose the previous state of our components. Use Link instead to prevent the default behavior of the anchor tag of sending a new request and instead handle the click on itself*/}
                            {/* <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li> */}
                            {/* The "exact" attribute is to be able to identify the active link (adding the "active" class to the link), or else all the links will be active by default */}
                            {/* If you wanted to add some specific class when a link is active instead of using the default "active", you must use the "activeClassName" prop to set your class.
                            To apply inline styling use "activeStyle" prop */}
                            {/* In the NavLink the "to" prop is which determines whether the link is active or not */}
                            <li><NavLink to="/hello" exact>Home</NavLink></li>
                            <li><NavLink
                                    to="/posts"
                                    // activeClassName="my-active"
                                    /* activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }} */
                                    >Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                // The argument "to" of the Link element by default manages absolute path.To use relative path you must use 'this.props.match.url'
                                // pathname: this.props.match.url + '/new-post',
                                // hash: To jump to the element id specified, or you could use "pathname: 'new-post#submit'" instead
                                hash: '#submit',
                                // search: allows us to add query params, or you could use the "pathname: '/new-post?quick-submit=true'" instead
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/hello" exact component={() => <h2>Hello world!</h2>} />
                {/* Switch --> to load a single route (the first route that matches up) or to use Redirect with the "from" prop */}
                <Switch>
                    {/* If the "exact" argument is not set everything starting with "/" will render the JSX content defined here: */}
                    {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" exact render={() => <h1>Home 2</h1>} /> */}
                    {/* The information about the routing is passed through the props to the components in the "history", "location" and "match" properties.
                    The routing related props are not passed down the component tree. We cannot access them in components that we embed as part of another component (e.i. Post.js) To solve that you can pass them via props, but a better approach is to use the "withRouter" HOC*/}
                    <Route path="/posts" component={Posts} />

                    {/****************** GUARDS *******************/}
                    {/* this.state.auth ? <Route path="/new-post" component={NewPost} /> : null */}
                    {/* Short circuit evaluation below: */}
                    { this.state.auth && <Route path="/new-post" component={AsyncNewPost} /> }
                    {/* An alternative to do this is to check if the user is unauthorized in the componentDidMount's NewPost component:
                        If unauth => this.props.history.replace('/posts');
                    */}
                    {/****************** GUARDS *******************/}

                    {/* If you use Redirect outside of the Swift statement, "from" prop can't be specified, so you will always be redirected to the path specified in the "to" prop */}
                    <Redirect from="/" exact to="/posts" />
                    {/* Handle Unknown routes (404 case): leave out the "path" prop */}
                    <Route render={() => <h1>404</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;