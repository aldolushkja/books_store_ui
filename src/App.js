import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
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
        this.state = {jwt: ""};
        this.handleJWTChange(this.handleJWTChange.bind(this));
    }

    handleJWTChange = (jwt) => {
        this.setState({jwt: jwt});
    };

    logout = () => {
        this.setState({jwt: ""});
        window.localStorage.removeItem("jwt");
    };

    componentDidMount() {
        let token = window.localStorage.getItem("jwt");
        if (token) {
            if (this.state.jwt === "") {
                this.setState({jwt: JSON.parse(token)});
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
                                    <li className="list-group-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link to="/books">Books</Link>
                                    </li>


                                    <li className="list-group-item">
                                        <Link to="/authors">Authors</Link>
                                    </li>

                                    <li className="list-group-item">
                                        <Link to="/genres">Genres</Link>
                                    </li>

                                    <li className="list-group-item">
                                        <Link to="/admin/add-book/0">Add a book</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link to="/admin/books">Manage Catalogue</Link>
                                    </li>
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
