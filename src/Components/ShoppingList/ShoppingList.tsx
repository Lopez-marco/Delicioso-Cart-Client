import React from 'react';
import ShoppingListInterface from './ShoppingListInterface';
import { Row, Col, List, Input } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ShoppingListElement from './ShoppingListElement';

export interface ShoppingListProps {
    token: string;
}

export interface ShoppingListState {
    list: ShoppingListInterface[];
    item: string;
    quantity: number;
    category: string;
    bought: boolean;
}

class ShoppingList extends React.Component<ShoppingListProps, ShoppingListState> {
    constructor(props: ShoppingListProps) {
        super(props);
        this.state = {
            list: [],
            item: '',
            quantity: 0,
            category: '',
            bought: false
        };
        this.fetchList = this.fetchList.bind(this);
        this.addItemQuick = this.addItemQuick.bind(this);
        this.createDraggableItem = this.createDraggableItem.bind(this);
    }

    componentDidMount() {
        this.fetchList();
        console.log('running')
    }

    //get all
    fetchList() {
        fetch('http://localhost:3001/shopping-list/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then((list: ShoppingListInterface[]) => {
                console.log(list);
                this.setState({
                    list: list,
                })
            })
    }
    // add item quick way
    addItemQuick() {
        fetch('http://localhost:3001/shopping-list/add-quick', {
            method: 'POST',
            body: JSON.stringify({
                item_name: this.state.item
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then((res: number) => {
                console.log(res);
                this.fetchList();
            })
    }




    //for React DnD
    onDragEnd = (result: any) => {
        console.log(result)
        const { destination, source, reason, draggableId } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const items = Object.assign([], this.state.list);
        const droppedItem = this.state.list[source.index];

        items.splice(source.index, 1);
        items.splice(destination.index, 0, droppedItem);

    }

    //creates React Dnd list
    createDraggableItem(item: ShoppingListInterface, index: number) {
        return (
            <Draggable
                key={index}
                draggableId={index + ''}
                index={index}
            >
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ShoppingListElement item={item} />
                    </div>
                )}
            </Draggable>
        )
    }


    render() {

        return (
            <>
                {this.state.list.length > 0 ?
                    <Row style={{ margin: '2em' }}>
                        <Col span={12} offset={6}>
                            <List bordered>
                                <List.Item className='list-item' > Shopping List </List.Item>
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Droppable droppableId='shoppingListDnD'>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {this.state.list.map((item, index) => this.createDraggableItem(item, index))}
                                                {provided.placeholder}
                                            </div>)}
                                    </Droppable>
                                </DragDropContext>
                                <List.Item className='list-item' style={{ borderBottom: '1px solid lightslategray' }}><Input className='borderless' placeholder='Add another item...'/></List.Item>
                            </List>
                        </Col>
                    </Row>
                    : 'no items'
                }
            </>
        );
    }
}

export default ShoppingList;