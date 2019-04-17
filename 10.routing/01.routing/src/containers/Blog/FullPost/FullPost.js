import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate () {
        this.loadData();
    }

    async loadData () {
        if (this.props.match.params.id) {
            // It is mandatory to check if the loadedPost has something and is
            // different than the older, or else an infinite loop will exist
            // because the setState() method triggers componentDidUpdate
            if (!this.state.loadedPost
                || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                const response = await axios.get(`/posts/${this.props.match.params.id}`);
                this.setState({ loadedPost: response.data });
            }
        }
    }

    deletePostHandler = async () => {
        try {
            const response = await axios.delete(`/posts/${this.props.match.params.id}`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button
                            className="Delete"
                            onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;