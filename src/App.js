import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Genres from "./components/Genres";
import Home from "./components/Home";
import OneBook from "./components/OneBook";
import OneAuthor from "./components/OneAuthor";
import OneGenre from "./components/OneGenre";


export default class App extends Component {

    render() {
        return (
            <Router>
                <div className="container">
                    <div className="row">
                        <div className="col mt-3">
                            <h1>Books Store</h1>
                            <hr className="mb-3"/>
                        </div>
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
                                        <Link to="/admin/books">Add a book</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link to="/admin/catalogue">Manage Catalogue</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-10">
                            <Switch>

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

                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
