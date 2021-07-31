import React, {Component, Fragment} from "react";
import Loading from "./../images/loading.gif";

export default class OneBook extends Component {
    state = {book: {}, isLoaded: false, error: null};

    constructor(props) {
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
                console.log(json)
                setTimeout(() => {
                    this.setState({
                        book: json,
                        isLoaded: true,
                    });
                }, 3000);
            });
    }

    render() {
        const {book, isLoaded, error} = this.state;
        if (error) {
            return <div className="bg bg-danger">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <img src={Loading} alt="loading..." width="300" height="300"/>;
        } else {
            return (
                <Fragment>
                    <h2>Book: {book.title}</h2>
                    <div className="float-start">
                        <small>Rating: </small>
                        {Array(book.rating).fill(null).map((x, i) => (
                            <i className="bi bi-star-fill" key={i}/>
                        ))}
                    </div>
                    <div className="float-end">
                        {book.genres.map((m, index) => (
                            <span className="badge bg-secondary me-1" key={index}>
                    {m.name}
                        </span>
                        ))}
                    </div>

                    <div className="clearfix"/>
                    <hr/>
                    <table className="table table-compact table-striped">
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td><strong>Publisher:</strong></td>
                            <td>{book.publisher.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Published:</strong></td>
                            <td>{book.publishedAt}</td>
                        </tr>
                        <tr>
                            <td><strong>ISBN:</strong></td>
                            <td>{book.isbn}</td>
                        </tr>
                        <tr>
                            <td><strong>Pages:</strong></td>
                            <td>{book.pages}</td>
                        </tr>
                        <tr>
                            <td><strong>Description:</strong></td>
                            <td>{book.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Price:</strong></td>
                            <td>{book.prices[0].value.toFixed(2)} {book.prices[0].symbol} </td>
                        </tr>
                        </tbody>
                    </table>
                </Fragment>
            );
        }
    }
}
