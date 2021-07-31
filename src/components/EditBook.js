import React, {Component, Fragment} from "react";
import Loading from "./../images/loading.gif";
import {Link} from "react-router-dom";
import Input from "./form-components/Input";
import Select from "./form-components/Select";
import TextArea from "./form-components/TextArea";
import Alert from "./ui-components/Alert";

export default class OneBook extends Component {
    state = {
        book: {}, genres: [], authors: [], publishers: [], isLoaded: false, error: null, errors: [],
        alert: {
            type: "d-none",
            message: "",
        },
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("componentDidMount::EditBook");

        //fetch all authors, genres, publishers
        this.fetchGenres();
        this.fetchAuthors();
        this.fetchPublishers();

        let id = this.props.match.params.id;
        if (id > 0) {
            console.log("Editing book with id: " + id);
            setTimeout(() => {
                this.setState({
                    isLoaded: true,
                });
            }, 2000);
        } else {
            setTimeout(() => {
                this.setState({
                    isLoaded: true,
                });
            }, 2000);
        }
    }

    fetchAuthors = () => {
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
                this.setState({
                    authors: json,
                });
            });
    }

    fetchPublishers = () => {
        fetch("http://localhost:8080/api/v1/publishers")
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
                this.setState({
                    publishers: json,
                });
            });
    }

    fetchGenres = () => {
        fetch("http://localhost:8080/api/v1/genres")
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
                this.setState({
                    genres: json,
                });
            });
    }

    hasError = (param) => {
        console.log("has error")
    }

    handleChange = (evt) => {
        console.log("handle change");
    }
    confirmDelete = () => {
        console.log("confirm delete");
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("handle submit");
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
                    <h2>{book.id === 0 ? "Add" : "Edit"} book</h2>
                    <Alert
                        alertType={this.state.alert.type}
                        alertMessage={this.state.alert.message}
                    />
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={book.id}
                            onChange={this.handleChange}
                        />
                        <Input
                            id={"title"}
                            title={"Title"}
                            className={this.hasError("title") ? "is-invalid" : ""}
                            name={"title"}
                            value={book.title}
                            handleChange={this.handleChange}
                            errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                            errorMsg={"Please enter a title"}
                        />
                        <Input
                            id={"published_date"}
                            title={"Publish Date"}
                            name={"publish_date"}
                            value={book.publishedAt}
                            type={"date"}
                            handleChange={this.handleChange}
                        />
                        <Input
                            id={"isbn"}
                            title={"ISBN"}
                            name={"isbn"}
                            value={book.isbn}
                            type={"text"}
                            handleChange={this.handleChange}
                        />
                        <TextArea
                            id={"description"}
                            title={"Description"}
                            name={"description"}
                            value={book.description}
                            rows={"3"}
                            handleChange={this.handleChange}
                        />


                        <Select
                            title={"Genres"}
                            name={"genre"}
                            value={book.mpaa_rating}
                            handleChange={this.handleChange}
                            placeholder={"Choose Genre..."}
                            id={"genre"}
                            options={this.state.genres}
                        />

                        <Select
                            title={"Author"}
                            name={"author"}
                            value={book.author}
                            handleChange={this.handleChange}
                            placeholder={"Choose Author..."}
                            id={"author"}
                            options={this.state.authors}
                        />

                        <Select
                            title={"Publisher"}
                            name={"publisher"}
                            value={book.publisher}
                            handleChange={this.handleChange}
                            placeholder={"Choose Publisher..."}
                            id={"publisher"}
                            options={this.state.publishers}
                        />
                        <Input
                            id={"rating"}
                            title={"Rating"}
                            name={"rating"}
                            value={book.rating}
                            type={"number"}
                            handleChange={this.handleChange}
                        />
                        <Input
                            id={"pages"}
                            title={"Pages"}
                            name={"pages"}
                            value={book.pages}
                            type={"number"}
                            handleChange={this.handleChange}
                        />

                        <Input
                            id={"price"}
                            title={"Price"}
                            name={"price"}
                            value={book.price}
                            type={"number"}
                            handleChange={this.handleChange}
                        />
                        {/*<Select*/}
                        {/*    title={"MPAA Rating"}*/}
                        {/*    name={"mpaa_rating"}*/}
                        {/*    value={book.mpaa_rating}*/}
                        {/*    handleChange={this.handleChange}*/}
                        {/*    placeholder={"Choose..."}*/}
                        {/*    id={"mpaa_rating"}*/}
                        {/*    mpaaOptions={this.state.mpaaOptions}*/}
                        {/*/>*/}


                        <hr/>
                        <button className="btn btn-primary">
                            {book.id === 0 ? "Save" : "Edit"}
                        </button>
                        <Link to="/admin" className="btn btn-warning ms-1">
                            Cancel
                        </Link>
                        {book.id > 0 && (
                            <a
                                href="#!"
                                onClick={() => this.confirmDelete()}
                                className="btn btn-danger ms-1"
                            >
                                Delete
                            </a>
                        )}
                    </form>
                </Fragment>
            );
        }
    }
}
