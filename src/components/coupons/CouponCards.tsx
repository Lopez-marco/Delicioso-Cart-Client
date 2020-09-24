import React from "react";

export interface CouponCardsProps {
  key: number;
  coupons: any[];
}

const CouponCards: React.SFC<CouponCardsProps> = (props) => {
  return <div>{props.coupons.name}</div>;
};

export default CouponCards;
