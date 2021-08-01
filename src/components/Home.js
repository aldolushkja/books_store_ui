import React, {Component, Fragment} from "react";
import Loading from "./../images/loading.gif";
import HomeBg from "./../images/home.jpg";

export default class Home extends Component {
  state = {status: {}, isLoaded: false, error: null};

  componentDidMount() {
    console.log("componentDidMount::Home");
    fetch("http://localhost:8080/api/v1/status")
        .then((response) => {
          if (response.status !== 200) {
            let err = Error;
          err.message =
            "Server response with invalid status code!" + response.status;
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
            status: json,
            isLoaded: true,
          });
        }, 2000);
      });
  }
  render() {
    const { status, isLoaded, error } = this.state;
    if (error) {
      return <div className="bg bg-danger">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <img src={Loading} alt="loading..." width="300" height="300" />;
    } else {
      return (
        <Fragment>
          <h2>Welcome to Book Store!</h2>
          <div>
            <ul className="list-group  list-group-flush">
              <li className="list-group-item d-flex justify-content-evenly flex-fill">
                <strong>Environment</strong> {status.environment}
                <span className="badge bg-primary rounded-pill">
                  {status.version}
                </span>
                |<strong>Status</strong>
                <span
                  className={
                    status.status === "Available"
                        ? "badge bg-success"
                        : "badge bg-danger"
                  }
                >
                  {status.status}
                </span>
              </li>
              <li className="list-group-item  align-items-center flex-fill"></li>
            </ul>
            <img src={HomeBg} alt="home-logo" width="800" height="400"/>
          </div>
        </Fragment>
      );
    }
  }
}
