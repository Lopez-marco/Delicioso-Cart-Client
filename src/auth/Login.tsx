import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./auth.css";

type valueTypes = {
  email: string;
  password: string;
};

type acceptedProps = {
  updateToken: Function;
  updateUserRole: any;
};

class Login extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      email: "",

      password: "",
    };
  }

  handleSubmit = (event: any) => {
    fetch("http://localhost:3001/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        console.log(data.sessionToken);
      });
  };
  render() {
    return (
      <div id="login">
        <h1 id="login-h1">Login</h1>
        <div className="container">
          <Form onFinish={this.handleSubmit} className="loginForm">
            <h2>Email</h2>
            <Input
              id="loginInput"
              onChange={(e) => this.setState({ email: e.target.value })}
              name="email"
              type="email"
              style={{ width: 500 }}
            />
            <h2>Password</h2>
            <Input
              id="loginInput"
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              type="password"
              style={{ width: 500 }}
            />
            <br></br>
            <Button
              type="primary"
              htmlType="submit"
              id="login-btn"
              className="btn"
            >
              Log in
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
