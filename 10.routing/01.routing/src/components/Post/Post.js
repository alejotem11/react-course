import React from 'react';
// import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

// withRouter HOC: Only direct components specified in the Route have access to the "history", "location", and "match" routing related properties. If you wanted to have access to these properties in one of the children of the component you could use the HOC "withRouter", so this component will get the props containing the information for the nearest loaded Route (in this case the Posts component)
//export default withRouter(post);
export default post;