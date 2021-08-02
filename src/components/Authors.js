import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import Loading from "./../images/loading.gif";

export default class Authors extends Component {
    state = {authors: [], isLoaded: false, error: null};

    componentDidMount() {
        console.log("componentDidMount::Authors");
        console.log("componentDidMount::Authors::jwt=" + this.props.jwt);
        console.log("componentDidMount::Authors::isUser=" + this.props.isUser);
        console.log("componentDidMount::Authors::isAdmin=" + this.props.isAdmin);
        if (this.props.jwt === "") {
            this.props.history.push({
                pathname: "/login",
            });
        }
        if (this.props.isAdmin === false) {
            if (this.props.isUser === false) {
                console.log("componentDidMount::Authors::userNOTAuthorized")
                this.props.history.push({
                    pathname: "/login",
                });
            }
            console.log("componentDidMount::Authors::userAuthorized")
        }
        const requestOptions = {
            headers: {
                "Authorization": "Bearer " + this.props.jwt,
            }
        }
        fetch("http://localhost:8080/api/v1/authors", requestOptions)
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
