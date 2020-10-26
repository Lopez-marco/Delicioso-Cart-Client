import React, { useState } from "react";
import { ListsInterface } from "./ShoppingListInterface";
import { Menu, Button, Modal, Form, Input, Dropdown, List } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import APIURL from "../../helpers/environment";

export interface ManageListElementProps {
  list: ListsInterface;
  fetchLists: Function;
}

const ManageListElement: React.SFC<ManageListElementProps> = (props) => {
  const [newListName, setNewListName] = useState("");
  const [editModalDisplay, setEditModalDisplay] = useState(false);
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  let editListModal = () => {
    setEditModalDisplay(true);
  };

  let editListHandleOk = () => {
    renameList(props.list.id);
  };

  let editListHandleCancel = () => {
    setEditModalDisplay(false);
  };

  let deleteListModal = () => {
    setDeleteModalDisplay(true);
  };

  let deleteListHandleOk = () => {
    deleteList(props.list.id);
  };

  let deleteListHandleCancel = () => {
    setDeleteModalDisplay(false);
  };

  function renameList(id: number) {
    fetch(`${APIURL}/shopping-list/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: newListName,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res: number) => {
        setNewListName("");
        props.fetchLists();
        setEditModalDisplay(false);
      });
  }

  function deleteList(id: number) {
    fetch(`${APIURL}/shopping-list/delete/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        props.fetchLists();
        setDeleteModalDisplay(false);
      });
  }

  // const editModal = (
  //     );

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button className="borderless" onClick={editListModal}>
          <EditOutlined /> Rename
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button className="borderless" onClick={deleteListModal}>
          <DeleteOutlined /> Delete
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <List.Item
        className="list-item"
        key={props.list.id}
        style={{ borderBottom: "0.5px solid gray" }}
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        actions={[
          <a key="list-options">
            <div id="components-dropdown-demo-dropdown-button">
              <Dropdown overlay={menu}>
                <Button className="borderless">
                  <EllipsisOutlined rotate={90} />
                </Button>
              </Dropdown>
            </div>
          </a>,
        ]}
      >
        <p>{props.list.name}</p>
      </List.Item>

      <Modal
        title="Rename List"
        visible={editModalDisplay}
        onOk={editListHandleOk}
        onCancel={editListHandleCancel}
      >
        <Form {...layout} name="renameList">
          <Form.Item
            name={["renameListInput"]}
            label="Rename List"
            rules={[{ required: true }]}
          >
            <Input onChange={(e) => setNewListName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete List"
        visible={deleteModalDisplay}
        onOk={deleteListHandleOk}
        onCancel={deleteListHandleCancel}
      >
        <p>This will delete your list. Proceed?</p>
      </Modal>
    </div>
  );
};

export default ManageListElement;
