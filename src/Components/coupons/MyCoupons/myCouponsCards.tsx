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
import APIURL from "../../../helpers/environment";

export interface myCouponsCardsProps {
  key: number;
  myCouponCards: MyCouponResult;
  token: string;
  fetchCoupons: Function;
}

export interface myCouponsCardsState {
  Date: string;
}

const { Text } = Typography;

class myCouponsCards extends React.Component<
  myCouponsCardsProps,
  myCouponsCardsState
> {
  constructor(props: myCouponsCardsProps) {
    super(props);
    this.state = { Date: "" };
    this.dateandTime = this.dateandTime.bind(this);
    this.itsExpired = this.itsExpired.bind(this);
  }

  Delete = () => {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    fetch(`${APIURL}/coupons/delete/${this.props.myCouponCards.id}`, {
      method: "Delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((res) => res.json())
      .then((res: number) => {
        console.log(res);
        this.props.fetchCoupons();
        message.warning("Coupon Deleted.");
      });
  };

  componentDidMount() {
    this.itsExpired();
    this.dateandTime();
  }

  dateandTime() {
    let currentDateAndTime = new Date().toLocaleString();
    console.log(currentDateAndTime);
    this.setState({
      Date: currentDateAndTime,
    });
  }

  itsExpired() {
    let expired = this.props.myCouponCards.coupon.coupon.expiration;
    console.log(expired);
    // expired.split("", 3);
    // console.log(expiredNumber);
  }

  render() {
    return (
      <div>
        <Col>
          <Card
            className="cardback"
            hoverable
            style={{
              width: 400,
              height: 170,
              marginTop: 16,
              borderRadius: 10,
              cursor: "default",
            }}
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
                    {this.props.myCouponCards.coupon.coupon.expiration}
                  </Text>
                </h5>
              </Col>
              <Col span={2}>
                <MyCouponsModal myCouponCards={this.props.myCouponCards} />
                <br />
                <br />
                <Tooltip title="UnClip Coupon">
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
