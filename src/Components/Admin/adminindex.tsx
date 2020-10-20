import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Typography,
  Button,
  Card,
  Tooltip,
  message,
} from "antd";
export interface UserListProps {
  token: string;
}

export interface UserListState {
  username: string;
  email: string;
  favorite_store: string;
  account_type: boolean;
}

class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props);
    this.state = {
      username: "",
      email: "",
      favorite_store: "",
      account_type: false,
    };
    this.fetchList = this.fetchList.bind(this);
    // this.updateSpecificUser = this.updateSpecificUser.bind(this);
    // this.deleteSpecificUser = this.deleteSpecificUser.bind(this);
  }
  componentDidMount() {
    this.fetchList();
  }

  //get all users
  fetchList() {
    fetch(`http://localhost:3001/user/view-all"`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    }).then((res) => res.json());
  }

  // update user
  // updateSpecificUser() {
  //   fetch(`http://localhost:3001/user/admin-user-update/${user.id}`, {
  //     method: "PUT",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: `${localStorage.getItem("token")}`,
  //     }),
  //   }).then((res) => res.json());
  // }

  // delete user
  // deleteSpecificUser() {
  //   fetch(`http://localhost:3001/user/delete/${user.id}`, {
  //     method: "DELETE",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: `${localStorage.getItem("token")}`,
  //     }),
  //   }).then((res) => res.json());
  // }

  UserList: React.FunctionComponent<UserListProps> = (props) => {
    return (
      <>
        <h1>Users</h1>

        <div>
          <Col>
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
                  <h4>
                    {this.state.username}

                    <br />

                    {this.state.account_type}

                    <br />
                  </h4>
                  <h4>{this.state.email}</h4>
                </Col>
              </Row>
            </Card>
          </Col>
        </div>
      </>
    );
  };
}

export default UserList;
