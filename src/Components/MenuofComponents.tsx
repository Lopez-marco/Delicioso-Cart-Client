import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import FavoriteStore from "../components/FavoviteStore/FavoriteStore";

export interface MenuofComponentsProps {}

export interface MenuofComponentsState {}

class MenuofComponents extends React.Component<
  MenuofComponentsProps,
  MenuofComponentsState
> {
  constructor(props: MenuofComponentsProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Row gutter={[6, 48]} justify="center">
          <Col></Col>
        </Row>
        <Row gutter={[6, 48]} justify="center">
          <Col></Col>
        </Row>
        <Row gutter={[6, 48]} justify="center">
          {/* <Col></Col> */}
        </Row>

        <Row gutter={[6, 48]} justify="center">
          <Col span={9}>
            <FavoriteStore />
            <Col></Col>
          </Col>
          <Col span={5}></Col>
          <Col span={4}></Col>
        </Row>

        <Row gutter={[48, 16]} justify="center">
          <Col>
            <Link to="/stores" style={{ textDecoration: "none" }}>
              <Card
                hoverable
                title="Default size card"
                style={{ width: 300 }}
                onClick={() => console.log("im click")}
              >
                <p>Other stores button</p>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/coupons" style={{ textDecoration: "none" }}>
              <Card style={{ width: 300 }}>
                <p>view coupons button</p>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/shoppinglist">
              <Card title="Default size card" style={{ width: 300 }}>
                <p>Shopping list</p>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MenuofComponents;
