import React from 'react';
import { Checkbox, List, Menu, Dropdown, Button, message, Form, Input, InputNumber } from 'antd';
import { ShoppingListInterface } from './ShoppingListInterface';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Modal from 'antd/lib/modal/Modal';

export interface ShoppingListElementProps {
    item: ShoppingListInterface;
    fetchList: Function;
    index: number;
    id: number;
}
export interface ShoppingListElementState {
    item_new: string;
    quantity_new: number;
    bought_new: boolean;
    modalDisplay: boolean;
}

class ShoppingListElement extends React.Component<ShoppingListElementProps, ShoppingListElementState> {
    constructor(props: ShoppingListElementProps) {
        super(props);
        this.state = {
            item_new: '',
            quantity_new: 0,
            bought_new: false,
            modalDisplay: false,
        };
        this.onChange = this.onChange.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.editItem = this.editItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    onChange(e: CheckboxChangeEvent) {
        this.checkItem(e);
    }

    handleMenuClick(e: any) {
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
        fetch(`http://localhost:3001/items/edit/${this.props.item.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                item_name: this.state.item_new,
                quantity: this.state.quantity_new,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
            .then(res => res.json())
            .then((res: number) => {
                this.setState({ modalDisplay: false });
                this.props.fetchList(this.props.id);
            })
    }
    // edit item
    checkItem(e: CheckboxChangeEvent) {
        fetch(`http://localhost:3001/items/update-item/${this.props.item.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                bought: e.target.checked
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
            .then(res => res.json())
            .then((res: number) => {
                console.log(res);
                this.props.fetchList(this.props.id);
            })
    }

    // delete item
    deleteItem() {
        fetch(`http://localhost:3001/items/delete/${this.props.item.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
            .then(res => res.json())
            .then((res: number) => {
                console.log(res);
                this.props.fetchList(this.props.id);
                message.info('Item Deleted.');
            })
    }


    showModal() {
        this.setState({ modalDisplay: true });
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
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return (
            <div>
                <List.Item
                    className='list-item'
                    key={this.props.item.id}
                    style={{borderBottom: '0.5px solid gray'}}
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
                    <Checkbox defaultChecked={this.props.item.bought} onChange={this.onChange}>{this.props.item.item_name}</Checkbox>
                </List.Item>
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
                    <Form {...layout} name="myList">
                        <Form.Item name={['item']} label="Item" rules={[{ required: true }]}>
                            <Input defaultValue={this.props.item.item_name} onChange={e => this.setState({item_new: e.target.value})}/>
                        </Form.Item>
                        <Form.Item name={['Quantity']} label="Quantity" rules={[{ type: 'number', min: 1, max: 99 }]}>
                            <InputNumber defaultValue={this.props.item.quantity} onChange={e => this.setState({quantity_new: Number(e)})}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default ShoppingListElement;

