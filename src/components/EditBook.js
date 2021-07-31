import React, {Component, Fragment} from "react";
import Loading from "./../images/loading.gif";

export default class OneBook extends Component {
    state = {book: {}, isLoaded: false, error: null};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("componentDidMount::EditBook");
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

    render() {
        const {book, isLoaded, error} = this.state;
        if (error) {
            return <div className="bg bg-danger">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <img src={Loading} alt="loading..." width="300" height="300"/>;
        } else {
            return (
                <Fragment>
                    <h2>{this.props.match.params.id > 0 ? "Edit Book" : "Create new Book"}</h2>

                </Fragment>
            );
        }
    }
}
