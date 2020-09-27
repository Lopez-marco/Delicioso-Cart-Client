import React from "react";
import "./App.css";
import Coupons from "./components/coupons/CouponsParent";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Coupons />
      </div>
    );
  }
}

export default App;
