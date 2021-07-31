import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import Loading from "./../images/loading.gif";

export default class Books extends Component {
    state = {authors: [], isLoaded: false, error: null};

    componentDidMount() {
        console.log("componentDidMount::Authors");
        fetch("http://localhost:8080/api/v1/authors")
            .then((response) => {
                if (response.status !== 200) {
                    let err = Error;
                    err.message = "Server response with invalid status code!" + response.status;
                    this.setState({
                        error: err,
                    });
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                setTimeout(() => {
                    this.setState({
                        authors: json,
                        isLoaded: true,
                    });
                }, 3000);
            });
    }

    render() {
        const {authors, isLoaded, error} = this.state;
        if (error) {
            return <div className="bg bg-danger">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <img src={Loading} alt="loading..." width="300" height="300"/>;
        } else {
            return (
                <Fragment>
                    <h2>Choose an author!</h2>
                    <div className="list-group">
                        {authors.map((c) => (
                            <Link
                                key={c.id}
                                to={`/author/${c.id}`}
                                className="list-group-item list-group-item-action"
                            >
                                {c.name}
                            </Link>
                        ))}
                    </div>
                </Fragment>
            );
        }
    }
}
