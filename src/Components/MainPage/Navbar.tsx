import React from "react";
import { Menu, Layout } from "antd";
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
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>Home</Menu.Item>

            <Menu.Item>Stores</Menu.Item>
            <Menu.Item>Manufactured Coupons</Menu.Item>
            <Menu.Item>Shopping List</Menu.Item>
            <Menu.Item>Log Out</Menu.Item>
          </Menu>
        </Header>
      </div>
    );
  }
}

export default Navbar;
