import React from "react";
import Navbar from "./MainPage/Navbar";
import { Route, Switch } from "react-router-dom";
import FindStore from "./FavoviteStore/FindStore/FindStore";
import MenuofComponents from "./MenuofComponents";
import CouponsMainPage from "./coupons/CouponsMainPage";
import ShoppingList from "./ShoppingList/ShoppingList";

export interface IndexProps {
  token: string;
  favorite_store: string;
}

export interface IndexState {}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <MenuofComponents />
          </Route>
          <Route exact path="/stores">
            <FindStore />
          </Route>
          <Route exact path="/Coupons">
            <CouponsMainPage
              token={this.props.token}
              favorite_store={this.props.favorite_store}
            />
          </Route>
          <Route exact path="/shoppingList">
            <ShoppingList token={this.props.token} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Index;
