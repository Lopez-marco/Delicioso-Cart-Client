import React, { EventHandler, FormEvent } from 'react';
import { Checkbox, List, Menu, Dropdown, Button, message } from 'antd';
import ShoppingListInterface from './ShoppingListInterface';
import { DeleteOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export interface ShoppingListElementProps {
    item: ShoppingListInterface;
}

const ShoppingListElement: React.SFC<ShoppingListElementProps> = (props) => {
    function onChange(e: CheckboxChangeEvent) {
        console.log(`checked = ${e.target.checked}`);
    }

    function handleMenuClick(e: any) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" >
                <Button className='borderless'><EditOutlined /> Edit</Button>
            </Menu.Item>
            <Menu.Item key="2" >
                <Button className='borderless'><DeleteOutlined /> Delete</Button>
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
            <Checkbox onChange={onChange}>{props.item.item_name}</Checkbox>
        </List.Item>
    );
}

export default ShoppingListElement;