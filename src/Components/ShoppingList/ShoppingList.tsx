import React from "react";
import ShoppingListInterface from "./ShoppingListInterface";
import { Row, Col, List, Input } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ShoppingListElement from "./ShoppingListElement";

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

class ShoppingList extends React.Component<
  ShoppingListProps,
  ShoppingListState
> {
  constructor(props: ShoppingListProps) {
    super(props);
    this.state = {
      list: [],
      item: "",
      quantity: 0,
      category: "",
      bought: false,
    };
    this.fetchList = this.fetchList.bind(this);
    this.addItemQuick = this.addItemQuick.bind(this);
    this.addItemLong = this.addItemLong.bind(this);
    this.updateItemOrder = this.updateItemOrder.bind(this);
    this.createDraggableItem = this.createDraggableItem.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  //get all
  fetchList() {
    fetch(`http://localhost:3001/shopping-list/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((list: ShoppingListInterface[]) => {
        console.log(list);
        this.setState({
          list: list,
        });
      });
  }
  // add item quick way
  addItemQuick() {
    fetch(`http://localhost:3001/shopping-list/add-quick`, {
      method: "POST",
      body: JSON.stringify({
        item_name: this.state.item,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((res: number) => {
        console.log(res);
        this.fetchList();
      });
  }

  // add item long way
  addItemLong() {
    fetch(`http://localhost:3001/shopping-list/add-long`, {
      method: "POST",
      body: JSON.stringify({
        item_name: this.state.item,
        quantity: this.state.quantity,
        cetegory: this.state.category,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((res: number) => {
        console.log(res);
        this.fetchList();
      });
  }

  // update item order
  updateItemOrder(item: ShoppingListInterface, order: number) {
    fetch(`http://localhost:3001/shopping-list/update-item/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({
        order: order,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((res: number) => {
        console.log(res);
      });
  }

  //for React DnD
  onDragEnd = (result: any) => {
    const { destination, source, reason } = result;
    if (!destination || reason === "CANCEL") {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const items = Object.assign([], this.state.list);
    const droppedItem = this.state.list[source.index];

    items.splice(source.index, 1);
    items.splice(destination.index, 0, droppedItem);

    items.forEach((item: ShoppingListInterface, index: number): void => {
      item.order = index;
      this.updateItemOrder(item, index);
    });

    this.setState({ list: items });
  };

  //creates React Dnd list
  createDraggableItem(item: ShoppingListInterface, index: number) {
    return (
      <Draggable key={index} draggableId={index + ""} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ShoppingListElement
              token={this.props.token}
              fetchList={this.fetchList}
              item={item}
              index={index}
            />
          </div>
        )}
      </Draggable>
    );
  }

  render() {
    return (
      <>
        <Row style={{ margin: "2em" }}>
          <Col span={12} offset={6}>
            <List bordered>
              <List.Item className="list-item"> Shopping List </List.Item>
              {this.state.list.length > 0 ? (
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="shoppingListDnD">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {this.state.list.map((item, index) =>
                          this.createDraggableItem(item, index)
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : null}
              <List.Item
                className="list-item"
                style={{ borderTop: "1px solid lightslategray" }}
              >
                <Input
                  className="borderless"
                  onPressEnter={(e) => {
                    this.addItemQuick();
                  }}
                  onChange={(e) => this.setState({ item: e.target.value })}
                  placeholder="Add item..."
                />
              </List.Item>
            </List>
          </Col>
        </Row>
      </>
    );
  }
}

export default ShoppingList;
