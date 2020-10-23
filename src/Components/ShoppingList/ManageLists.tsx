import React from 'react';
import { ListsInterface } from './ShoppingListInterface';
import {  Button, Modal, Form, Input, List } from 'antd';
import ManageListElement from './ManageListsElement';

export interface ManageListsProps {
    lists: ListsInterface[];
    fetchLists: Function;
}

export interface ManageListsState {
}

class ManageLists extends React.Component<ManageListsProps, ManageListsState> {
    constructor(props: ManageListsProps) {
        super(props);
        this.state = { 
        };
    }


    render() {

        return (
            <div id='manage-lists-component'>
                    <List bordered style={{background: 'white'}}>
                        {this.props.lists.map(list => <ManageListElement list={list} fetchLists={this.props.fetchLists} />)}
                    </List>
            </div>
        );
    }
}

export default ManageLists;