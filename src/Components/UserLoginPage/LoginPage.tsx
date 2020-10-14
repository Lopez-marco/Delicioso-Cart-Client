import React from "react";

export interface LoginPageProps {}

export interface LoginPageState {}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <div></div>;
  }
}

export default LoginPage;
