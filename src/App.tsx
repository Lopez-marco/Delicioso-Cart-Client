import React from "react";
import "./App.css";
import Coupons from "./components/coupons/CouponsParent";
import Geolocation from "./components/FavoviteStore/Geolocation";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  GeoURL =
    "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww";
  render() {
    return (
      <div>
        <Geolocation url={this.GeoURL} />
        <Coupons />
      </div>
    );
  }
}

export default App;
