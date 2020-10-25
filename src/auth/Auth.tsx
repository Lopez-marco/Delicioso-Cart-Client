import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./auth.css";
import Login from "./Login";
import Signup from "./Signup";

type acceptedProps = {
  token: string;

  updateUserRole: boolean;
  updateToken: Function;
};

type typeState = {
  showLogin: boolean;
};

class Auth extends React.Component<acceptedProps, typeState> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      showLogin: false,
    };
  }

  loginToggle = (event: any) => {
    event.preventDefault();
    if (this.state.showLogin === true) {
      return this.setState({
        showLogin: false,
      });
    }
    if (this.state.showLogin === false) {
      return this.setState({
        showLogin: true,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div id="signuplogin">
          {this.state.showLogin ? (
            <Login
              updateToken={this.props.updateToken}
              updateUserRole={this.props.updateUserRole}
            />
          ) : (
            <Signup updateToken={this.props.updateToken} />
          )}
          <br />
          <Button
            type="primary"
            id="toggle"
            className="btn"
            onClick={(e) => this.loginToggle(e)}
          >
            {this.state.showLogin
              ? "Register Here"
              : "Already registered? Login here"}
          </Button>
        </div>
      </div>
    );
  }
}

export default Auth;
