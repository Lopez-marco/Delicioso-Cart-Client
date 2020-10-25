import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UnorderedListOutlined,
  BarcodeOutlined,
  ShopOutlined,
} from "@ant-design/icons";

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
          style={{ width: 256, borderRadius: 10 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.Item>
            <a href="/">
              <HomeOutlined />
              Home
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/Coupons">
              {" "}
              <BarcodeOutlined />
              Manufactured Coupons{" "}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/shoppingList">
              <UnorderedListOutlined />
              Shopping List
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/stores">
              <ShopOutlined />
              Stores
            </a>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default ManuBar;
