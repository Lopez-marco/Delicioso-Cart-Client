import React from "react";
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
import { Coupon, Coupon2, MyCouponResult } from "./myCouponInterface";
import MyCouponsCards from "./myCouponsCards";

export interface MyCouponsProps {
  token: string;
}

export interface MyCouponsState {
  MyCoupon: any;
}

class MyCoupons extends React.Component<MyCouponsProps, MyCouponsState> {
  constructor(props: MyCouponsProps) {
    super(props);
    this.state = { MyCoupon: [] };
  }

  componentDidMount() {
    fetch("http://localhost:3001/coupons/addedcoupons", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((json: MyCouponResult) => {
        console.log(json);
        // this.setState({
        //   MyCoupon: json.coupon.coupon,
        // });
      });
  }

  render() {
    return (
      <div>
        hello from my coupons
        {/* {this.state.MyCoupon.length > 0 ? (
          this.state.MyCoupon.map((Mycoupons: Coupon2, index: number) => (
            <MyCouponsCards
              myCouponCards={Mycoupons}
              key={index}
              token={this.props.token}
            />
          ))
        ) : (
          <></>
        )} */}
      </div>
    );
  }
}

export default MyCoupons;
