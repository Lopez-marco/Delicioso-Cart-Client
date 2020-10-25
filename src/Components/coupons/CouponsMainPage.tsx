import React from "react";
import { Tabs, Row, Card, Button, Col } from "antd";
import { PaperClipOutlined, BarcodeOutlined } from "@ant-design/icons";
import Coupons from "./CouponsApi/CouponsParent";
import MyCoupons from "./MyCoupons/MyCoupons";
import Menubar from "../MainPage/Menubar";

const { TabPane } = Tabs;

export interface CouponsMainPageProps {
  token: string;
  favorite_store: string;
}

export interface CouponsMainPageState {}

class CouponsMainPage extends React.Component<
  CouponsMainPageProps,
  CouponsMainPageState
> {
  constructor(props: CouponsMainPageProps) {
    super(props);
    this.state = {
      token: "",
      favorite_store: "",
    };
  }
  render() {
    return (
      <div className="coupons">
        <br />
        <br />
        <br />
        <Row gutter={[4, 6]} justify="center">
          <Col></Col>
        </Row>
        <Row gutter={[4, 48]} justify="center">
          <Col></Col>
          <Col span={4}>
            <Menubar />{" "}
          </Col>
          <Col span={1}></Col>

          <Card
            hoverable
            style={{
              cursor: "default",
              width: 1000,
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
                  <Coupons token={this.props.token} />
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
                  <MyCoupons token={this.props.token} />
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Row>
      </div>
    );
  }
}

export default CouponsMainPage;
