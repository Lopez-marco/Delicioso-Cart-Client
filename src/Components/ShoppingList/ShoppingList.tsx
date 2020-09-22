import React from 'react';
// import ShoppingListInterface from './ShoppingListInterface';
import { Button } from 'antd';

export interface ShoppingListProps {

}

export interface ShoppingListState {
    
}

class ShoppingList extends React.Component<ShoppingListProps, ShoppingListState> {
    constructor(props: ShoppingListProps) {
        super(props);
        this.state = {};
    }

    componentDidUpdate() {
    
    }
    render() {
        return ( <Button type="primary">button</Button> );
    }
}

export default ShoppingList;