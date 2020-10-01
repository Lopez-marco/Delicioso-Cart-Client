import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

export interface NavbarProps {}

export interface NavbarState {}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal">
              <Menu.Item>Stores</Menu.Item>
              <Menu.Item>Grocery List</Menu.Item>
              <Menu.Item>Manufactured Coupons</Menu.Item>
              <Menu.Item style={{ float: "right" }}>Login</Menu.Item>
              <Menu.Item style={{ float: "right" }}>Sign Up</Menu.Item>
            </Menu>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default Navbar;
