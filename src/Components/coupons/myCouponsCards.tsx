import React from "react";
import { Coupon2 } from "./myCouponInterface";

export interface myCouponsCardsProps {
  key: number;
  myCouponCards: Coupon2;
  token: string;
}

export interface myCouponsCardsState {}

class myCouponsCards extends React.Component<
  myCouponsCardsProps,
  myCouponsCardsState
> {
  constructor(props: myCouponsCardsProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        hello from mycoupons cards
        {this.props.myCouponCards.couponid}
        here...
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default myCouponsCards;
