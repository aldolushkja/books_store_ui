import React, { Component, Fragment } from "react";
import Loading from "./../images/loading.gif";

export default class OneBook extends Component {
    state = { book: {}, isLoaded: false, error: null };
    
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log("componentDidMount::OneBook");
        fetch("http://localhost:8080/api/v1/books/" + this.props.match.params.book_id)
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
                        book: json,
                        isLoaded: true,
                    });
                }, 2000);
            });
    }
    render() {
        const { book, isLoaded, error } = this.state;
        if (error) {
            return <div className="bg bg-danger">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <img src={Loading} alt="loading..." width="300" height="300" />;
        } else {
            return (
                <Fragment>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">{book.title} - {book.publishedAt}</div>
                            <div className="card-text">
                                Author: {book.authors[0].name} <br />
                                Genre: {book.genres[0].name}
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}
