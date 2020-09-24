import React, { useState } from 'react';
import { Checkbox, List, Menu } from 'antd';
import ShoppingListInterface from './ShoppingListInterface';
import {
    DragOutlined,
    EllipsisOutlined,
    SettingOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

export interface ShoppingListElementProps {
    item: ShoppingListInterface;
}

const ShoppingListElement: React.SFC<ShoppingListElementProps> = (props) => {
    const [current, setCurrent] = useState();
    function onChange(e: any) {
        console.log(`checked = ${e.target.checked}`);
    }
    function  handleClick(e: any) {
        console.log('click ', e);
        setCurrent(e.key);
      };

    return (
        <List.Item
            actions={[<a key="list-options">
                <Menu
                    onClick={handleClick}
                    style={{ width: 256, border: 'none' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <EllipsisOutlined rotate={90}/>
                            </span>
                        }
                    >
                        <Menu.ItemGroup key="g1" title="Item 1">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup key="g2" title="Item 2">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                   
                </Menu>
            </a>]}
        >
            <Checkbox onChange={onChange}>{props.item.item_name}</Checkbox>
        </List.Item>
    );
}

export default ShoppingListElement;