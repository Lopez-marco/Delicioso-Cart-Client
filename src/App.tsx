import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import logo from "./logo.svg";
import "./App.css";
import Auth from "./auth/Auth";

class App extends React.Component {
  updateToken = (token: string) => {
    localStorage.setItem("token", token);
    this.setState({ token: token });
  };
  render() {
    return (
      <div className="App">
        <Auth
          token={""}
          updateUserRole={false}
          updateToken={this.updateToken}
        />
      </div>
    );
  }
}

export default App;
