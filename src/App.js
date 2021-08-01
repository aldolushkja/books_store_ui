import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Genres from "./components/Genres";
import Home from "./components/Home";
import OneBook from "./components/OneBook";
import OneAuthor from "./components/OneAuthor";
import OneGenre from "./components/OneGenre";
import EditBook from "./components/EditBook";
import Login from "./components/Login";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {jwt: "", isAdmin: false, isUser: false, isGuest: true};
        this.handleJWTChange(this.handleJWTChange.bind(this));
        // this.handleUserProfile(this.handleUserProfile.bind(this));
    }

    handleUserProfile = () => {
        if (this.state.jwt !== "") {
            let decode = jwt_decode(this.state.jwt);
            this.setState({
                isAdmin: decode.groups.includes("ADMIN"),
                isUser: decode.groups.includes("USER"),
            })
        } else {
            this.setState({isAdmin: false, isUser: false, isGuest: true});
        }
    }

    handleJWTChange = (jwt) => {
        this.setState({jwt: jwt});
        this.handleUserProfile();
    };

    logout = () => {
        this.setState({jwt: "", isAdmin: false, isUser: false, isGuest: true});
        window.localStorage.removeItem("jwt");
    };

    componentDidMount() {
        let token = window.localStorage.getItem("jwt");
        if (token) {
            if (this.state.jwt === "") {
                this.setState({jwt: token});
            }
        }
    }

    render() {
        let loginLink;
        if (this.state.jwt === "") {
            loginLink = <Link to="/login">Login</Link>;
        } else {
            loginLink = (
                <Link to="/logout" onClick={this.logout}>
                    Logout
                </Link>
            );
        }
        return (
            <Router>
                <div className="container">
                    <div className="row">
                        <div className="col mt-3">
                            <h1 className="mt-3">Books Store</h1>
                        </div>
                        <div className="col mt-3 text-end">{loginLink}</div>
                        <hr className="mb-3"/>
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            <nav>
                                <ul className="list-group">

                                    {
                                        this.state.isGuest && (
                                            <Fragment>
                                                <li className="list-group-item">
                                                    <Link to="/">Home</Link>
                                                </li>
                                                <li className="list-group-item">
                                                    <Link to="/books">Books</Link>
                                                </li>
                                            </Fragment>
                                        )
                                    }
                                    {
                                        (this.state.isUser || this.state.isAdmin) && (
                                            <Fragment>
                                                <li className="list-group-item">
                                                    <Link to="/authors">Authors</Link>
                                                </li>

                                                <li className="list-group-item">
                                                    <Link to="/genres">Genres</Link>
                                                </li>
                                            </Fragment>
                                        )
                                    }
                                    {
                                        this.state.isAdmin && (
                                            <Fragment>
                                                <li className="list-group-item">
                                                    <Link to="/admin/add-book/0">Add a book</Link>
                                                </li>
                                                <li className="list-group-item">
                                                    <Link to="/admin/books">Manage Catalogue</Link>
                                                </li>
                                            </Fragment>
                                        )
                                    }
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-10">
                            <Switch>
                                <Route
                                    exact
                                    path="/login"
                                    component={(props) => (
                                        <Login {...props} handleJWTChange={this.handleJWTChange}/>
                                    )}
                                />
                                <Route exact path="/">
                                    <Home/>
                                </Route>
                                <Route path="/books">
                                    <Books/>
                                </Route>
                                <Route path="/book/:book_id" component={OneBook}/>
                                <Route path="/author/:author_id" component={OneAuthor}/>
                                <Route path="/genre/:genre_id" component={OneGenre}/>
                                <Route path="/authors">
                                    <Authors/>
                                </Route>
                                <Route path="/genres">
                                    <Genres/>
                                </Route>

                                <Route path="/admin/add-book/:id" component={EditBook}/>

                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
