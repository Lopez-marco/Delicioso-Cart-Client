import React from "react";
import {
  ListsInterface,
  ShoppingListArrayInterface,
  ShoppingListInterface,
} from "./ShoppingListInterface";
import { List, Input, Button } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ShoppingListElement from "./ShoppingListElement";
import APIURL from "../../helpers/environment";

export interface ShoppingListProps {
  id: number;
  listName: string;
}

export interface ShoppingListState {
  list: ShoppingListArrayInterface;
  item: string;
  quantity: number;
  category: string;
  bought: boolean;
  prevPropId: number;
}

class ShoppingList extends React.Component<
  ShoppingListProps,
  ShoppingListState
> {
  private addItemIput: React.RefObject<Input>;
  constructor(props: ShoppingListProps) {
    super(props);
    this.state = {
      list: [],
      item: "",
      quantity: 0,
      category: "",
      bought: false,
      prevPropId: 0,
    };
    this.addItemIput = React.createRef();
    this.fetchList = this.fetchList.bind(this);
    this.addItemQuick = this.addItemQuick.bind(this);
    this.addItemLong = this.addItemLong.bind(this);
    this.updateItemOrder = this.updateItemOrder.bind(this);
    this.deleteChecked = this.deleteChecked.bind(this);
    this.createDraggableItem = this.createDraggableItem.bind(this);
  }

  componentDidMount() {
    this.fetchList(this.props.id);
  }

  componentDidUpdate() {
    if (this.props.id !== this.state.prevPropId) {
      this.fetchList(this.props.id);
    }
  }

  //get list
  fetchList(id: number) {
    fetch(`${APIURL}/shopping-list/list/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((list: ListsInterface) => {
        console.log("LIST", list.items);
        this.setState({
          list: list.items!,
          prevPropId: this.props.id,
        });
      });
  }

  // add item quick way
  addItemQuick() {
    if(this.state.item) {
    fetch(`${APIURL}/items/add-quick`, {
      method: "POST",
      body: JSON.stringify({
        shoppingListId: this.props.id,
        item_name: this.state.item,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res: number) => {
        this.addItemIput.current?.setValue("");
        this.setState({item: ''})
        this.fetchList(this.props.id);
      });
    }
  }

  // add item long way
  addItemLong() {
    fetch(`${APIURL}/items/add-long`, {
      method: "POST",
      body: JSON.stringify({
        shoppingListId: this.props.id,
        item_name: this.state.item,
        quantity: this.state.quantity,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res: number) => {
        console.log(res);
        this.fetchList(this.props.id);
      });
  }

  // update item order
  updateItemOrder(item: ShoppingListInterface, order: number) {
    fetch(`${APIURL}/items/update-item/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({
        order: order,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res: number) => {
        console.log(res);
      });
  }

  // delete all checked items from list
  deleteChecked() {
    let checked = [];
    for (let item of this.state.list) {
      if (item.bought) {
        checked.push(item.id);
      }
    }
    fetch(`${APIURL}/shopping-list/delete-checked/`, {
      method: "DELETE",
      body: JSON.stringify({
        checked: checked,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.fetchList(this.props.id);
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
              fetchList={this.fetchList}
              item={item}
              index={index}
              id={this.props.id}
            />
          </div>
        )}
      </Draggable>
    );
  }

  render() {
    return (
      <div id="single-shopping-list">
        <List bordered style={{ background: "white" }}>
          <div id="shopping-list-header">
            <List.Item className="shopping-list list-item">
              <h3 style={{ marginRight: "20em" }}>
                ShoppingList - {this.props.listName}
              </h3>
              <Button
                style={{ marginLeft: "5em" }}
                onClick={this.deleteChecked}
              >
                Delete Checked Items
              </Button>
            </List.Item>
          </div>
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
              ref={this.addItemIput}
              onPressEnter={(e) => {
                this.addItemQuick();
              }}
              onChange={(e) => this.setState({ item: e.target.value })}
              placeholder="Add item..."
            />
          </List.Item>
        </List>
      </div>
    );
  }
}

export default ShoppingList;
