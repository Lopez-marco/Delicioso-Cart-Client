import React from "react";
import Auth from "./auth/Auth";

import ShoppingList from "./components/ShoppingList/ShoppingList";
import { Tabs, Row, Card, Button, Col } from "antd";
import "./App.css";
import Coupons from "./components/coupons/CouponsApi/CouponsParent";
import MyCoupons from "./components/coupons/MyCoupons/MyCoupons";
import { PaperClipOutlined, BarcodeOutlined } from "@ant-design/icons";
import FavoriteStore from "./components/FavoviteStore/FavoriteStore";
import FindStore from "./components/FavoviteStore/FindStore/FindStore";

export interface AppProps {}

export interface AppState {
  token: string;
  favorite_store: string;
}

const { TabPane } = Tabs;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { token: "", favorite_store: "" };
  }

  updateToken = (token: string) => {
    if (localStorage.getItem("token")) {
      this.setState({ token: token });
    }
    localStorage.setItem("token", token);
    this.setState({ token: token });
  };
  store = (favorite_store: string) => {
    if (localStorage.getItem("favorite_store")) {
      this.setState({ favorite_store: favorite_store });
    }
    localStorage.setItem("favorite_store", favorite_store);
    this.setState({ favorite_store: favorite_store });
  };

  userLogin = () => {
    return this.state.token === localStorage.getItem("token")
      ? "" // <LogoutButton clickLogout={clearToken} />
      : ""; // <Auth updateToken={props.updateToken} />
  };

  render() {
    return (
      <div>
        {/* <Navbar /> */}
        {/* <Geolocation url={this.GeoURL} /> */}
        {/* <FindStore />
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
        </Row> */}
        <Row gutter={[8, 48]}>
          <Col span={6} />
          <Col span={12} />
        </Row>
        <Row gutter={[16, 16]}>
          <Col></Col>
          <Col span={13}>
            <Card> Logo o webpage add or video</Card>
          </Col>
          <Col span={10}>
            <Card>
              <Auth
                token={""}
                favorite_store={""}
                updateUserRole={false}
                updateToken={this.updateToken}
                store={this.store}
              />
            </Card>
            <Col span={6} />
          </Col>
        </Row>

        {/* <ShoppingList token={this.state.token} /> */}
      </div>
    );
  }
}

export default App;
