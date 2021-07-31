import React, {Component, Fragment} from "react";
import Loading from "./../images/loading.gif";
import {Link} from "react-router-dom";

export default class OneBook extends Component {
    state = {books: [], isLoaded: false, error: null};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("componentDidMount::OneBook");
        fetch("http://localhost:8080/api/v1/books/by-author/" + this.props.match.params.author_id)
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
                console.log(json);
                setTimeout(() => {
                    this.setState({
                        books: json,
                        isLoaded: true,
                    });
                }, 3000);
            });
    }

    render() {
        const {books, isLoaded, error} = this.state;
        if (error) {
            return <div className="bg bg-danger">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <img src={Loading} alt="loading..." width="300" height="300"/>;
        } else {
            return (
                <Fragment>
                    <h2>All Books having author: {books[0].authorName}</h2>
                    <div className="list-group">
                        {books.map((c) => (
                            <Link
                                key={c.id}
                                to={`/book/${c.id}`}
                                className="list-group-item list-group-item-action"
                            >
                                {c.title}
                            </Link>
                        ))}
                    </div>
                </Fragment>
            );
        }
    }
}
