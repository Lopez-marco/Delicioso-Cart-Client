import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "../App.css";

type valueTypes = {
  username: string;
  setusername: string;
  email: string;
  password: string;
  setPassword: string;
};

type acceptedProps = {
  updateToken: Function;
};

class Signup extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      username: "",
      setusername: "",
      email: "",
      password: "",
      setPassword: "",
    };
  }

  handleSubmit = (event: any) => {
    console.log(this.state.username, this.state.email, this.state.password);
    fetch("http://localhost:3001/user/add-user", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
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
        console.log("Signup Working");
        console.log(data.sessionToken);
      });
  };
  render() {
    return (
      <div id="signupDiv">
        <h1 id="signupHeading">Sign Up to Join the Fun</h1>
        <Form onFinish={this.handleSubmit} className="signupForm">
          <h2>Username</h2>
          <Input
            className="signupInput"
            onChange={(e) => this.setState({ username: e.target.value })}
            value={this.state.username}
            name="username"
            type="text"
          />
          <h2>Email</h2>
          <Input
            id="signupInputEmail"
            onChange={(e) => this.setState({ email: e.target.value })}
            value={this.state.email}
            name="email"
            type="email"
          />
          <h2>Password</h2>
          <Input
            className="signupInput"
            onChange={(e) => this.setState({ password: e.target.value })}
            name="password"
            value={this.state.password}
            type="password"
          />
          <Button type="primary" htmlType="submit" id="register-btn">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
