import React from 'react';
import { ListsInterface } from './ShoppingListInterface';
import { Menu, Button, Modal, Form, Input, message, Dropdown, List } from 'antd';
import {
    MenuUnfoldOutlined, MenuFoldOutlined, CheckSquareOutlined, PlusCircleOutlined,
    SettingOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined
} from '@ant-design/icons';
import ManageListElement from './ManageListsElement';

export interface ShoppingListsProps {
    token: string;
}

export interface ShoppingListsState {
    lists: ListsInterface[];
    collapsed: boolean;
    newListName: string;
    addListModalDisplay: boolean;
    manageListsModalDisplay: boolean;
    editListDisplayModal: boolean;
    deleteListDisplayModal: boolean;
}

class ShoppingLists extends React.Component<ShoppingListsProps, ShoppingListsState> {
    constructor(props: ShoppingListsProps) {
        super(props);
        this.state = {
            lists: [],
            collapsed: false,
            newListName: '',
            addListModalDisplay: false,
            manageListsModalDisplay: false,
            editListDisplayModal: false,
            deleteListDisplayModal: false
        };
        this.fetchLists = this.fetchLists.bind(this);
        this.addList = this.addList.bind(this);
        // this.renameList = this.renameList.bind(this);
    }

    componentDidMount() {
        this.fetchLists();
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    fetchLists() {
        fetch(`http://localhost:3001/shopping-list/all`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
            .then(res => res.json())
            .then((lists: ListsInterface[]) => {
                console.log(lists);
                this.setState({
                    lists: lists,
                })
            })
    }

    addListModal = () => {
        this.setState({
            addListModalDisplay: true,
        });
    }
    manageListsModal = () => {
        this.setState({
            manageListsModalDisplay: true,
        });
    }


    addListHandleOk = () => {
        this.addList();
    };

    addListHandleCancel = () => {
        this.setState({ addListModalDisplay: false });
    };
    manageListsHandleOk = () => {
        return;
    };

    manageListsListHandleCancel = () => {
        this.setState({ manageListsModalDisplay: false });
    };

    // deleteListHandleOk = () => {
    //     this.deleteList();
    // };

    // deleteListHandleCancel = () => {
    //     this.setState({ deleteListDisplayModal: false });
    // };

    addList() {
        fetch(`http://localhost:3001/shopping-list/add-list`, {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.newListName
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
            .then(res => res.json())
            .then((res: number) => {
                this.setState({ addListModalDisplay: false, newListName: '' });
                this.fetchLists();
            })
    }

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        return (
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >

                    {this.state.lists.map((list) =>
                        <Menu.Item key={list.id} icon={<CheckSquareOutlined />}>
                            {list.name}
                        </Menu.Item>)}
                    <Menu.Divider />
                    <Menu.Item key='998' icon={<PlusCircleOutlined />} onClick={this.addListModal}>
                        Add List
                </Menu.Item>
                    <Menu.Item key='999' icon={<SettingOutlined />} onClick={this.manageListsModal}>
                        Manage Lists
                </Menu.Item>
                </Menu>

                {/* add list */}
                <Modal
                    title="Add List"
                    visible={this.state.addListModalDisplay}
                    onOk={this.addListHandleOk}
                    onCancel={this.addListHandleCancel}
                >
                    <Form {...layout} name="newList">
                        <Form.Item name={['newListInput']} label="New List" rules={[{ required: true }]}>
                            <Input onChange={e => this.setState({ newListName: e.target.value })} />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* manage lists */}
                <Modal
                    title="Manage Lists"
                    visible={this.state.manageListsModalDisplay}
                    onOk={this.manageListsHandleOk}
                    onCancel={this.manageListsListHandleCancel}
                >
                    <List bordered>
                        {this.state.lists.map(list => <ManageListElement list={list} fetchLists={this.fetchLists} />)}
                    </List>
                </Modal>


            </div>
        );
    }
}

export default ShoppingLists;