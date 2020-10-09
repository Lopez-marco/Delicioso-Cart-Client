import React from "react";
import {
  Row,
  Col,
  Image,
  Typography,
  Button,
  Card,
  Tooltip,
  message,
} from "antd";
import { MyCouponResult } from "./myCouponInterface";
import { DeleteOutlined } from "@ant-design/icons";
import MyCouponsModal from "./MyCouponsModal";

export interface myCouponsCardsProps {
  key: number;
  myCouponCards: MyCouponResult;
  token: string;
  fetchList: Function;
}

export interface myCouponsCardsState {}

const { Text } = Typography;

class myCouponsCards extends React.Component<
  myCouponsCardsProps,
  myCouponsCardsState
> {
  constructor(props: myCouponsCardsProps) {
    super(props);
    this.state = {};
  }

  Delete = () => {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    fetch(
      `http://localhost:3001/coupons/delete/${this.props.myCouponCards.id}`,
      {
        method: "Delete",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        }),
      }
    )
      .then((res) => res.json())
      .then((res: number) => {
        console.log(res);
        this.props.fetchList();
        message.warning("Coupon Deleted.");
      });
  };

  render() {
    return (
      <div>
        <Col>
          <Card
            className="cardback"
            hoverable
            style={{ width: 400, height: 170, marginTop: 16, borderRadius: 10 }}
          >
            <Row>
              <Col span={7}>
                <Image
                  width={80}
                  height={100}
                  src={this.props.myCouponCards.coupon.coupon.image[0]}
                />
              </Col>
              <Col span={14}>
                <h4>
                  <Text strong>
                    SAVE ${this.props.myCouponCards.coupon.coupon.value}
                  </Text>
                  <br />
                  <Text strong type="secondary">
                    {this.props.myCouponCards.coupon.coupon.brand}
                  </Text>
                  <br />
                </h4>
                <h5>
                  <Text type="secondary">
                    {" "}
                    {this.props.myCouponCards.coupon.coupon.description}
                  </Text>
                </h5>
              </Col>
              <Col span={2}>
                <MyCouponsModal myCouponCards={this.props.myCouponCards} />
                <br />
                <br />
                <Tooltip title="Clip Coupon">
                  <Button
                    onClick={this.Delete}
                    type="primary"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
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

export default myCouponsCards;
