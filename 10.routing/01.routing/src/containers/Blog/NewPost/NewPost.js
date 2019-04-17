import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount () {
        // *********** GUARD ***********
        // If unauth => this.props.history.replace('/posts');
    }

    postDataHandler = async () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        const response = await axios.post('/posts', data);

        // Changing the page after some operation has finished
        this.props.history.push('/posts');
        // this.props.history.replace('/posts'); // replace() replace the current stack page with the specified, such when you click the back button of the web browser you will not be redirected to the previous page
        // this.setState({ submitted: true }); If we were not using the push() method above we could redirect conditionally depending on the state
    }

    render () {
        let redirect = null;
        // Conditionally redirect
        // If you use the this.props.history.push('mypagetoredirect') instead of conditionally redirect (using the state), a new page is pushed to the stack of pages, so when you click the back button of the web browser you get redirected to the previos page
        if (this.state.submitted) {
            redirect = <Redirect to="/posts" />;
        }
        return (
            <div className="NewPost">
                { redirect }
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;