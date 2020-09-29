import React from 'react';
import { Checkbox, List, Menu, Dropdown, Button, message } from 'antd';
import ShoppingListInterface from './ShoppingListInterface';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Modal from 'antd/lib/modal/Modal';

export interface ShoppingListElementProps {
    item: ShoppingListInterface;
    fetchList: Function;
    token: string;
}
export interface ShoppingListElementState {
    item: string;
    quantity: number;
    category: string;
    bought: boolean;
    modalDisplay: boolean;
}

class ShoppingListElement extends React.Component<ShoppingListElementProps, ShoppingListElementState> {
    constructor(props: ShoppingListElementProps) {
        super(props);
        this.state = {
            item: '',
            quantity: 0,
            category: '',
            bought: false,
            modalDisplay: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.editItem = this.editItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    onChange(e: CheckboxChangeEvent) {
        this.setState({bought: e.target.checked});
        this.checkItem();
    }

    handleMenuClick(e: any) {
        message.info('Click on menu item.');
    }
    handleOk = () => {
        this.editItem();
    };

    handleCancel = () => {
        this.setState({ modalDisplay: false });
    };


    // edit item
    editItem() {
        console.log('from edit fetch')
        fetch(`http://localhost:3001/shopping-list/edit/${this.props.item.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                item_name: this.state.item,
                quantity: this.state.quantity,
                cetegory: this.state.category
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then((res: number) => {
                console.log(res);
                this.props.fetchList();
            })
    }
    // edit item
    checkItem() {
        console.log('from checkbox fetch')
        fetch(`http://localhost:3001/shopping-list/edit/${this.props.item.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                bought: this.state.bought
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then((res: number) => {
                console.log(res);
                this.props.fetchList();
            })
    }

    // delete item
    deleteItem() {
        fetch(`http://localhost:3001/shopping-list/delete/${this.props.item.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then((res: number) => {
                console.log(res);
                this.props.fetchList();
                message.info('Item Deleted.');
            })
    }


    showModal() {
        console.log("modal hit")
        this.setState({modalDisplay: true});
        this.generateModal();
            }

    generateModal() {
        return (
            <Modal
                title="Edit Item"
                centered
                visible={this.state.modalDisplay}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Cancel
                </Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        Submit
                </Button>,
                ]}
            >
                <p>something something</p>
            </Modal>
        );
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" >
                    <Button className='borderless' onClick={this.showModal}><EditOutlined /> Edit</Button>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Button className='borderless' onClick={this.deleteItem}><DeleteOutlined /> Delete</Button>
                </Menu.Item>
            </Menu>
        );
        return (
            <List.Item
                className='list-item'
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                actions={[<a key="list-options">
                    <div id="components-dropdown-demo-dropdown-button">
                        <Dropdown overlay={menu}>
                            <Button className='borderless'>
                                <EllipsisOutlined rotate={90} />
                            </Button>
                        </Dropdown>
                    </div>
                </a>]}
            >
                <Checkbox onChange={this.onChange}>{this.props.item.item_name}</Checkbox>
            </List.Item>
        );
    }
}

export default ShoppingListElement;

