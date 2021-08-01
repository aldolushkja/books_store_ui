import React, {Component, Fragment} from "react";
import Input from "./form-components/Input";
import Alert from "./ui-components/Alert";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: null,
            errors: [],
            alert: {
                type: "d-none",
                message: "",
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;

        this.setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    handleSubmit = (evt) => {
        evt.preventDefault();

        let errors = [];
        if (this.state.username === "") {
            errors.push("username");
        }

        if (this.state.password === "") {
            errors.push("password");
        }

        this.setState({errors: errors});

        if (errors.length > 0) {
            return false;
        }

        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: "POST",
            body: JSON.stringify(payload),
        };

        fetch(`${process.env.REACT_APP_API_URL}/users/signin`, requestOptions)
            .then((response) => {
                if (response.status !== 200) {
                    this.setState({
                        alert: {
                            type: "alert-danger",
                            message: "Username o password non validi",
                        },
                    });
                    let err = Error;
                    err.message = "Username o password non validi";
                    throw err;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                this.handleJWTChange(data.token);
                window.localStorage.setItem(
                    "jwt",
                    JSON.stringify(Object.values(data)[0])
                );
                this.props.history.push({
                    pathname: "/",
                });

            }).catch(err => {
            console.log(err.message)
        });
    };

    handleJWTChange = (jwt) => {
        this.props.handleJWTChange(jwt);
    };

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    render() {
        return (
            <Fragment>
                <h2>Login</h2>
                <Alert
                    alertType={this.state.alert.type}
                    alertMessage={this.state.alert.message}
                />

                <hr/>

                <form className="pt-1" onSubmit={this.handleSubmit}>
                    <Input
                        title={"Username"}
                        type={"text"}
                        name={"username"}
                        handleChange={this.handleChange}
                        className={this.hasError("username") ? "is-invalid" : ""}
                        errorDiv={this.hasError("username") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a valid username"}
                    />

                    <Input
                        title={"Password"}
                        type={"password"}
                        name={"password"}
                        handleChange={this.handleChange}
                        className={this.hasError("password") ? "is-invalid" : ""}
                        errorDiv={this.hasError("password") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a password"}
                    />

                    <hr/>
                    <button className="btn btn-primary">Login</button>

                    {/* <pre>{JSON.stringify(this.state)}</pre> */}
                </form>
            </Fragment>
        );
    }
}
