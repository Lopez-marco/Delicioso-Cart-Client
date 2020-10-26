import React from "react";
import Navbar from "./MainPage/Navbar";
import { Route, Switch } from "react-router-dom";
import FindStore from "./FavoviteStore/FindStore/FindStore";
import MenuofComponents from "./MenuofComponents";
import CouponsMainPage from "./coupons/CouponsMainPage";
import ShoppingLists from "./ShoppingList/ShoppingLists";
import AdminArea from "./Admin/adminindex";

export interface IndexProps {
  token: string;
  favorite_store: string;
  isAdmin: boolean;
  store: Function;
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
        <Navbar isAdmin={this.props.isAdmin}/>
        <Switch>
          <Route exact path="/">
            <MenuofComponents store={this.props.store} />
          </Route>
          <Route exact path="/stores">
            <FindStore store={this.props.store} />
          </Route>
          <Route exact path="/Coupons">
            <CouponsMainPage
              token={this.props.token}
              favorite_store={this.props.favorite_store}
            />
          </Route>
          <Route exact path="/shoppingList">
            <ShoppingLists token={this.props.token} />
          </Route>
          {this.props.isAdmin ? <Route exact path="/admin">
            <AdminArea token={this.props.token} />
          </Route> : null}
        </Switch>
      </div>
    );
  }
}

export default Index;
