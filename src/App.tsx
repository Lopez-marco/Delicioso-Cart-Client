import React from "react";
// import { RouteComponentProps, withRouter } from "react-router";
import Auth from "./auth/Auth";
import ShoppingList from "./Components/ShoppingList/ShoppingList";
import "./App.css";
import Coupons from "./Components/coupons/CouponsParent";
import Geolocation from "./Components/FavoviteStore/Geolocation";
import Navbar from "./Components/MainPage/Navbar";
import MyCoupons from "./Components/coupons/myCoupons";

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
        <Navbar />
        <Geolocation url={this.GeoURL} />
        <Coupons token={this.state.token} />
        <Auth
          token={""}
          updateUserRole={false}
          updateToken={this.updateToken}
        />
        <ShoppingList token={this.state.token} />
        <MyCoupons token={this.state.token} />
      </div>
    );
  }
}

export default App;
