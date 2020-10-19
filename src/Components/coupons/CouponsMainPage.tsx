import React from "react";
import { Tabs, Row, Card, Button, Col } from "antd";
import { PaperClipOutlined, BarcodeOutlined } from "@ant-design/icons";
import Coupons from "./CouponsApi/CouponsParent";
import MyCoupons from "./MyCoupons/MyCoupons";

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
      <div>
        <Row gutter={[18, 16]}>
          <Col></Col>
        </Row>
        <Row gutter={[18, 16]} justify={"center"}>
          <Card
            className="cardback"
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
