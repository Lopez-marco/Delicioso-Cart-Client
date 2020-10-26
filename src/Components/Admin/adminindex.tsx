import React, { useState, useEffect } from "react";
import { Row, Col, Select, Button, Card, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import APIURL from "../../helpers/environment";
const { Option } = Select;
export interface UserListProps {
  token: string;
}
export interface UserListState {
  fetchedUsers: adminGetAllResponse[];
  username: string;
  email: string;
  favorite_store: string;
  account_type: boolean;
}
export interface UpdateUserAccountProps {
  updateSpecificUser: Function;
}
export interface UpdateUserAccountState {
  account_type: boolean;
  visible: boolean;
}
class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props);
    this.state = {
      fetchedUsers: [],
      username: "",
      email: "",
      favorite_store: "",
      account_type: false,
    };
    this.fetchList = this.fetchList.bind(this);
    this.updateSpecificUserFalse = this.updateSpecificUserFalse.bind(this);
    this.deleteSpecificUser = this.deleteSpecificUser.bind(this);
  }
  componentDidMount() {
    this.fetchList();
  }
  //get all users
  fetchList() {
    fetch(`${APIURL}/user/view-all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ fetchedUsers: res }));
  }
  // update user
  updateSpecificUserFalse(userid = null) {
    fetch(`${APIURL}/user/admin-user-update/${userid}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          account_type: this.state.account_type,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
      // }).then((res) => this.fetchList());
    }).then((res) => {
      this.setState({ account_type: this.state.account_type });
      this.fetchList();
    });
  }

  onChange(e: any) {
    // console.log(`checked = ${e.target.checked}`);
    this.updateSpecificUserFalse();
  }

  // delete user
  deleteSpecificUser(userid: number) {
    fetch(`${APIURL}/user/delete/${userid}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    }).then((res) => this.fetchList());
  }
  displayCards = () => {
    if (this.state.fetchedUsers.length === 0) {
      return;
    }
    return this.state.fetchedUsers.map((carddata: adminGetAllResponse) => {
      return (
        <Card
          className="cardback"
          hoverable
          style={{
            width: 400,
            height: 170,
            marginTop: 16,
            borderRadius: 10,
          }}
        >
          <Row>
            <Col span={7}></Col>
            <Col span={14}>
              <h4>{carddata.username}</h4>
              <h4>{carddata.email}</h4>
              <h4>{carddata.favorite_store}</h4>
              <h4>{carddata.account_type}</h4>
              <Button
                onClick={() =>
                  carddata.id
                    ? this.deleteSpecificUser(carddata.id)
                    : alert("no ID")
                }
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
              />
              {/* <Button
                onClick={() =>
                  carddata.id
                    ? this.updateSpecificUser(carddata.id)
                    : alert("no ID")
                }
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
              /> */}

              {/* <Switch
                defaultChecked
                onChange={this.setState({ account_type: true })}
              /> */}
              {/* <Form>
                <Select
                  defaultValue="Change Account Type"
                  onChange={(value: string) =>
                    this.setState({ account_type: `${value}` })
                  }
                  style={{ width: 130 }}
                >
                  <Option value="true">Is Admin</Option>
                  <Option value="false">Not an Admin</Option>
                </Select>
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Submit
                </Button>
              </Form> */}
            </Col>
          </Row>
        </Card>
      );
    });
  };
  render() {
    return (
      <>
        <h1>Users</h1>
        <div>
          <Col>{this.displayCards()}</Col>
        </div>
      </>
    );
  }
}
export default UserList;
export interface adminGetAllResponse {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  favorite_store?: string;
  account_type?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
