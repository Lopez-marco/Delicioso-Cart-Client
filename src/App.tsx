import React from "react";
// import { RouteComponentProps, withRouter } from "react-router";
import Auth from "./auth/Auth";

import "./App.css";
import Coupons from "./components/coupons/CouponsParent";
import Geolocation from "./components/FavoviteStore/Geolocation";
import Navbar from "./components/MainPage/Navbar";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  updateToken = (token: string) => {
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
        <Coupons updateToken={this.updateToken} />
        <Auth
          token={""}
          updateUserRole={false}
          updateToken={this.updateToken}
        />
      </div>
    );
  }
}

export default App;
