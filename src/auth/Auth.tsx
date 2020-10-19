import React from "react";
import { Button } from "antd";
import "../App.css";
import Login from "./Login";
import Signup from "./Signup";

type acceptedProps = {
  token: string;
  favorite_store: string;

  updateUserRole: boolean;
  updateToken: Function;
  store: Function;
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
      <div id="container-auth">
        <h3 id="welcomeSubheading">Welcome to Delicioso Cart</h3>
        <div id="signuplogin">
          {this.state.showLogin ? (
            <Login
              updateToken={this.props.updateToken}
              updateUserRole={this.props.updateUserRole}
              store={this.props.store}
            />
          ) : (
            <Signup updateToken={this.props.updateToken} />
          )}
          <br />
          <Button
            type="primary"
            id="toggle"
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
