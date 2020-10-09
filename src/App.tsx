import React from "react";
// import { RouteComponentProps, withRouter } from "react-router";
import { setUsername, setIsLoggenIn, setToken, } from './store/store'
import Auth from "./auth/Auth";
import ShoppingList from "./components/ShoppingList/ShoppingList";

import "./App.css";
import Coupons from "./components/coupons/CouponsParent";
import Geolocation from "./components/FavoviteStore/Geolocation";
import Navbar from "./components/MainPage/Navbar";
import MyCoupons from "./components/coupons/myCoupons";

export interface AppProps {}

export interface AppState {
  token: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { token: "" };
  }
  updateToken = (token: string) => {
    if (localStorage.getItem("token")) {
      this.setState({ token: token });
    }
    localStorage.setItem("token", token);
    this.setState({ token: token });
  };
  GeoURL =
    "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww";
  render() {
    return (
      <div>
        {/* <CouponsParent updateToken={this.updateToken} token={this.state.token} /> */}
        <Navbar />
        <Geolocation url={this.GeoURL} />
        {/* <Coupons token={this.state.token} /> */}
        <Auth
          token={""}
          updateUserRole={false}
          updateToken={this.updateToken}
        />
        <ShoppingList token={this.state.token} />
        {/* <MyCoupons token={this.state.token} /> */}
      </div>
    );
  }
}
export default App;
