import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Loading from "./../images/loading.gif";

export default class Books extends Component {
    state = { books: [], isLoaded: false, error: null };

    componentDidMount() {
        console.log("componentDidMount::Books");
        fetch("http://localhost:8080/api/v1/books")
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
                        books: json,
                        isLoaded: true,
                    });
                }, 2000);
            });
    }
    render() {
        const { books, isLoaded, error } = this.state;
        if (error) {
            return <div className="bg bg-danger">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <img src={Loading} alt="loading..." width="300" height="300" />;
        } else {
            return (
                <Fragment>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">All Books</div>
                            <div className="card-text">
                                {books.map((c) => (
                                    <Link
                                        key={c.id}
                                        to={`/book/${c.id}`}
                                        className="list-group-item list-group-item-action"
                                    >
                                        {c.title}{" "}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}
