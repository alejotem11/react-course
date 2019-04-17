import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../myAxiosInstance';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    postSelectedHandler = id => {
        this.setState({ selectedPostId: id });
    }

    async componentDidMount() {
        // Without using async-await:
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        // .then(console.log);
        try {
            const response = await axios
                //.get('https://jsonplaceholder.typicode.com/posts');
                .get('/posts'); // Because we use default global config baseURL object on index.js
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts
                .map(post => ({ ...post, author: 'Alejandro' }));
            this.setState({ posts: updatedPosts });
        } catch (error) {
            this.setState({ error: true });
        }
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
        if (!this.state.error) {
            posts = this.state.posts
                .map(post => <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />);
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;