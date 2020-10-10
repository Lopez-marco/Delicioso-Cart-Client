import React from "react";
import Auth from "./auth/Auth";

import ShoppingList from "./components/ShoppingList/ShoppingList";
import { Tabs, Row, Card, Button } from "antd";
import "./App.css";
import Coupons from "./components/coupons/CouponsApi/CouponsParent";
import MyCoupons from "./components/coupons/MyCoupons/MyCoupons";
import { PaperClipOutlined, BarcodeOutlined } from "@ant-design/icons";
import FavoriteStore from "./components/FavoviteStore/FavoriteStore";


export interface AppProps {}

export interface AppState {
  token: string;
}

const { TabPane } = Tabs;

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
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        {/* <Geolocation url={this.GeoURL} /> */}
        <FavoriteStore />
        <Row gutter={[18, 16]} justify="center">
          <Card
            // className="cardback"
            hoverable
            style={{
              cursor: "default",
              width: 1300,
              marginTop: 16,
              borderRadius: 10,
            }}
          >
            <div className="card-container">
              <Tabs defaultActiveKey="1" type="card" centered>
                <TabPane
                  tab={
                    <span>
                      <Button>
                        <BarcodeOutlined /> Manufactured Coupons{" "}
                      </Button>
                    </span>
                  }
                  key="1"
                >
                  <Coupons token={this.state.token} />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Button>
                        <PaperClipOutlined />
                        My Clipped Coupons
                      </Button>
                    </span>
                  }
                  key="2"
                >
                  <MyCoupons token={this.state.token} />
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Row>

        <Auth
          token={""}
          updateUserRole={false}
          updateToken={this.updateToken}
        />

        <ShoppingList token={this.state.token} />
      </div>
    );
  }
}

export default App;
