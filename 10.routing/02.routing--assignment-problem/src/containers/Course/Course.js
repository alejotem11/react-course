import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseTitle: null
    };

    componentDidMount() {
        this.getTitle();
    };

    componentDidUpdate() {
        this.getTitle();
    };

    getTitle = () => {
        const query = new URLSearchParams(this.props.location.search);
        let title = null;
        for (let param of query.entries()) {
            title = param[1];
        };
        if (this.state.courseTitle !== title) {
            this.setState({ courseTitle: title });
        };
    };

    render () {
        return (
            <div>
                <h1>{this.state.courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;