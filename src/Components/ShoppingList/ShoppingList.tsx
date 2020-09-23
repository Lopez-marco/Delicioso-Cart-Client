import React from 'react';
import ShoppingListInterface from './ShoppingListInterface';
import { Row, Col, List } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export interface ShoppingListProps {
    token: string;
}

export interface ShoppingListState {
    list: ShoppingListInterface[];
    ids: number[];
}

class ShoppingList extends React.Component<ShoppingListProps, ShoppingListState> {
    constructor(props: ShoppingListProps) {
        super(props);
        this.state = {
            list: [],
            ids: []
        };
        this.fetchList = this.fetchList.bind(this);
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
                    ids: list.map(i=>i.id)
                })
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

        // const myList = 'shoppingListDnD';
        // const items = this.state.ids;
        // // const droppedItem = this.state.list[source.index]

        // items.splice(source.index, 1);
        // items.splice(destination.index, 0, draggableId);

        // const newIds = {
        //     myList,
        //     ids: items
        // }

        // const newState = {
        //     ...this.state,

        // }

        // // this.setState({ list: items })
    }

    //creates React Dnd list
    createDraggableItem(item: ShoppingListInterface, index:number) {
        return (
            <Draggable
                key={item.id}
                draggableId={item.item_name}
                index={this.state.ids[index]}
            >
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <List.Item>{item.item_name}</List.Item>
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
                        <Col span={24}>
                            <List bordered>
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Droppable droppableId='shoppingListDnD'>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {this.state.list.map((item, index) => this.createDraggableItem(item, index))}
                                                {provided.placeholder}
                                            </div>)}
                                    </Droppable>
                                </DragDropContext>
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