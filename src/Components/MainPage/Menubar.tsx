import React from "react";
import { Menu, Layout, Image } from "antd";

export interface ManuBarProps {}

export interface ManuBarState {}

class ManuBar extends React.Component<ManuBarProps, ManuBarState> {
  constructor(props: ManuBarProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.Item>
            <a href="/">Home</a>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default ManuBar;
