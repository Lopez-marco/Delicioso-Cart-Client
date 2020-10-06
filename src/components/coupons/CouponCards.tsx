import React from "react";
import { Item } from "./Couponsinterface";
import {
  Row,
  Col,
  Image,
  Typography,
  Button,
  Card,
  Tooltip,
  Modal,
} from "antd";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";

export interface CouponCardsProps {
  key: number;
  couponsbox: Item;
  // updateToken: Function;
  token: string;
}

export interface CouponCardsState {}

const { Text } = Typography;

class CouponCards extends React.Component<CouponCardsProps, CouponCardsState> {
  constructor(props: CouponCardsProps) {
    super(props);
    this.state = {};
  }

  handleCouponAdd = (event: any) => {
    event.preventDefault();
    fetch("http://localhost:3001/coupons/addcoupon", {
      method: "POST",
      body: JSON.stringify({ coupon: { coupon: this.props.couponsbox } }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((coupon) => {
        console.log(coupon);
        console.log(this.props.token);
      });
  };

  render() {
    let SaveCoupon = JSON.stringify(this.props.couponsbox);
    // console.log(SaveCoupon);
    return (
      <div>
        {/* {props.couponsbox.value}
      <br />
      {props.couponsbox.brand}
      <br />
      {props.couponsbox.activedate}
      <br />
      {props.couponsbox.couponid}
      <br />
      {props.couponsbox.description}
      <br />
      {props.couponsbox.expiration}
      <br />
      {props.couponsbox.image}
      <br />
      {props.couponsbox.link}
      <br />
      {props.couponsbox.majorCategory}
      <br />
      {props.couponsbox.minorCategory}
      <br />
      {props.couponsbox.shutoff}
      <br />
      {props.couponsbox.value}
      <br /> */}

        <Col>
          <Card
            hoverable
            style={{ width: 400, height: 170, marginTop: 16, borderRadius: 10 }}
          >
            <Row>
              <Col span={7}>
                <Image
                  width={80}
                  height={100}
                  src={this.props.couponsbox.image[0]}
                />
              </Col>
              <Col span={14}>
                <h4>
                  <Text strong>SAVE ${this.props.couponsbox.value}</Text>
                  <br />
                  <Text strong type="secondary">
                    {this.props.couponsbox.brand}
                  </Text>
                  <br />
                </h4>
                <h5>
                  <Text type="secondary">
                    {" "}
                    {this.props.couponsbox.description}
                  </Text>
                </h5>
              </Col>
              <Col span={2}>
                <Tooltip title="More">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<InfoCircleOutlined />}
                  />
                </Tooltip>
                <br />
                <Tooltip title="Clip Coupon">
                  <Button
                    onClick={this.handleCouponAdd}
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Col>
      </div>
    );
  }
}

export default CouponCards;

// export interface CouponCardsProps {
//   key: number;
//   couponsbox: Item;
// }

// const { Text } = Typography;

// const CouponCards: React.SFC<CouponCardsProps> = (props) => {
//   return (

//   );
// };

// export default CouponCards;
