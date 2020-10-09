import React from 'react';
import { connect } from 'react-redux';
import { setToken } from '../store/store';
import { Button, Form, Input } from "antd";
import "../App.css";
import { storeInterface } from '../store/storeInterface';

type valueTypes = {
  email: string;
  password: string;
};

type acceptedProps = {
  store: storeInterface;
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
        setToken(data.sessionToken);
        console.log(data.sessionToken);
      });
  };
  render() {
    return (
      <div id="login">
        <h1>Login</h1>
        <Form onFinish={this.handleSubmit} className="loginForm">
          <h2>Email</h2>
          <Input
            id="loginInput"
            onChange={(e) => this.setState({ email: e.target.value })}
            name="email"
            type="email"
          />
          <h2>Password</h2>
          <Input
            id="loginInput"
            onChange={(e) => this.setState({ password: e.target.value })}
            name="password"
            type="password"
          />
          <Button type="primary" htmlType="submit" id="login-btn">
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return
}

export default connect(mapStateToProps)(Login);
