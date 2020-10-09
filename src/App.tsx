import React from "react";
// import { RouteComponentProps, withRouter } from "react-router";
import Auth from "./auth/Auth";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import { Tabs, Row, Card, Button } from "antd";
import "./App.css";
import Coupons from "./components/coupons/CouponsApi/CouponsParent";
import Geolocation from "./components/FavoviteStore/Geolocation";
import MyCoupons from "./components/coupons/MyCoupons/MyCoupons";
import { PaperClipOutlined, BarcodeOutlined } from "@ant-design/icons";

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
  GeoURL =
    "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww";
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <Geolocation url={this.GeoURL} />
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
