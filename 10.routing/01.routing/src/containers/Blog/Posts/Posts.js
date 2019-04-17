import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'; // We use Link over NavLink because we don't plan to style active Links
import axios from '../../../myAxiosInstance';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    // Without using async-await:
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    // .then(console.log);
    try {
      console.log(this.props);
      const response = await axios
        //.get('https://jsonplaceholder.typicode.com/posts');
        .get('/posts'); // Because we use default global config baseURL object on index.js
      const posts = response.data.slice(0, 4);
      const updatedPosts = posts
        .map(post => ({ ...post, author: 'Alejandro' }));
      this.setState({ posts: updatedPosts });
    } catch (error) {
      console.log(error);
    }
  }

  postSelectedHandler = id => {
    // this.setState({ selectedPostId: id });
    // Navigating programatically instead of using "Link" (Mostly used after a given operation finish)
    this.props.history.push({ pathname: '/posts/' + id });
    // this.props.history.push('/posts/' + id);
  }

  render () {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts
        .map(post =>
          // <Link to={'/posts/' + post.id} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              // clicked={() => this.postSelectedHandler(post.id)}
              clicked={this.postSelectedHandler.bind(this, post.id)} />
          // </Link>
          );
    }
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        {/* Nested Route */}
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />{/*Dynamic routing parameter */}
      </div>
    );
  }
}

export default Posts;