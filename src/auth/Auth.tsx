
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./auth.css";

import React from "react";
import { Button, Row, Card, Col, Image } from "antd";
import "../App.css";

import Login from "./Login";
import Signup from "./Signup";
import Logo from "../assets/DeliciosoCartlong.png";

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

      <div className="logform">
        <Row gutter={[8, 48]}>
          <Col span={6} />
          <Col span={12} />
        </Row>
        <Row gutter={[16, 16]}>
          <Col></Col>
          <Col span={13}>
            <Card
              className="cardback"
              style={{ borderRadius: 10, textAlign: "center" }}
            >
              {" "}
              {/* Logo o webpage add or video */}
              <Image width={467} src={Logo} />
            </Card>
          </Col>
          <Col span={10}>
            <Card className="cardback" hoverable style={{ borderRadius: 10 }}>
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
            </Card>
            <Col span={6} />
          </Col>
        </Row>

      </div>
    );
  }
}

export default Auth;
