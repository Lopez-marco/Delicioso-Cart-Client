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
}

const { Text } = Typography;

const CouponCards: React.SFC<CouponCardsProps> = (props) => {
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
              <Image width={80} height={100} src={props.couponsbox.image[0]} />
            </Col>
            <Col span={14}>
              <h4>
                <Text strong>SAVE ${props.couponsbox.value}</Text>
                <br />
                <Text strong type="secondary">
                  {props.couponsbox.brand}
                </Text>
                <br />
              </h4>
              <h5>
                <Text type="secondary"> {props.couponsbox.description}</Text>
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
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
};

export default CouponCards;
