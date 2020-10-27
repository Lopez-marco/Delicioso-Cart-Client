import React from "react";
import { Row, Col, Card, Image } from "antd";
import { Link } from "react-router-dom";
import FavoriteStore from "./FavoviteStore/FavoriteStore";
import Logo from "../assets/DeliciosoCartBig.png";
import List from "../assets/test.png";
import Shop from "../assets/shops.png";
import Coupon from "../assets/voucher.png";

export interface MenuofComponentsProps {
  store: Function;
}

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
      <div className="MenuofComponents">
        <Row gutter={[4, 32]} justify="center">
          <Col></Col>
        </Row>
        <Row gutter={[4, 48]} justify="center">
          <Col></Col>
        </Row>
        <Row gutter={[48, 24]} justify="center">
          <Col span={4}></Col>
          <Col span={8}>
            <Image width={600} src={Logo} />
          </Col>
          <Col span={6}></Col>
          <Col span={6}>
            <Link to="/stores" style={{ textDecoration: "none" }}>
              <Card
                className="cardback"
                hoverable
                style={{
                  width: 200,
                  height: 150,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                <p>List Of Stores</p>
                <Image width={80} src={Shop} />
              </Card>
            </Link>
          </Col>
        </Row>

        <Row gutter={[48, 24]} justify="center">
          <Col span={6}></Col>
          <Col span={6}></Col>
          <Col span={6}></Col>
          <Col span={6}>
            <Link to="/coupons" style={{ textDecoration: "none" }}>
              <Card
                className="cardback"
                hoverable
                style={{
                  width: 200,
                  height: 150,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                <p>Manufactured Coupons</p>
                <Image width={80} src={Coupon} />
              </Card>
            </Link>
          </Col>
        </Row>

        <Row gutter={[48, 19]} justify="center">
          <Col span={6}></Col>
          <Col span={8}>
            <FavoriteStore store={this.props.store} />
          </Col>
          <Col span={2}>
            <Link to="/shoppinglist">
              <Card
                className="cardback"
                hoverable
                style={{
                  width: 200,
                  height: 150,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                <p>Shopping list</p>
                <Image width={80} src={List} />
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MenuofComponents;
