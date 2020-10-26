import React, { MouseEvent } from "react";
import { Modal, Button, Tooltip, Col, Row, Image, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { MyCouponResult } from "./myCouponInterface";

export interface MyCouponsModalProps {
  myCouponCards: MyCouponResult;
}

export interface MyCouponsModalState {
  visible: boolean;
}

const { Text } = Typography;

class MyCouponsModal extends React.Component<
  MyCouponsModalProps,
  MyCouponsModalState
> {
  constructor(props: MyCouponsModalProps) {
    super(props);
    this.state = { visible: false };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: MouseEvent) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: MouseEvent) => {
    console.log();
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Tooltip title="More">
          <Button
            type="primary"
            shape="circle"
            icon={<InfoCircleOutlined />}
            onClick={this.showModal}
          />
        </Tooltip>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* {this.props.couponsbox.value}
          <br />
          {this.props.couponsbox.brand}
          <br />
          {this.props.couponsbox.activedate}
          <br />
          {this.props.couponsbox.couponid}
          <br />
          {this.props.couponsbox.description}
          <br />
          {this.props.couponsbox.expiration}
          <br />
          {this.props.couponsbox.image}
          <br />
          {this.props.couponsbox.link}
          <br />
          {this.props.couponsbox.majorCategory}
          <br />
          {this.props.couponsbox.minorCategory}
          <br />
          {this.props.couponsbox.shutoff}
          <br />
          {this.props.couponsbox.value} */}

          <Col>
            <Row>
              <Col span={7}>
                <Image
                  width={80}
                  height={100}
                  src={this.props.myCouponCards.coupon.coupon.image[0]}
                />
              </Col>
              <Col span={15}>
                <h4>
                  <Text strong>
                    SAVE ${this.props.myCouponCards.coupon.coupon.value}0
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
                    <br />
                    Expiration :{" "}
                    {this.props.myCouponCards.coupon.coupon.expiration}
                    <br />
                    {this.props.myCouponCards.coupon.coupon.majorCategory}
                    <br />
                    {this.props.myCouponCards.coupon.coupon.minorCategory}
                  </Text>
                </h5>
              </Col>
              {/* <Col span={2}>
                <CouponCardsModal couponbox={this.props.couponsbox} />
                <br />
                <br />
                <Tooltip title="Clip Coupon">
                    <Button
                      onClick={this.handleCouponAdd}
                      type="primary"
                      shape="circle"
                      icon={<PlusOutlined />}
                    />
                  </Tooltip>
              </Col> */}
            </Row>
          </Col>
        </Modal>
      </div>
    );
  }
}

export default MyCouponsModal;
