import React from "react"

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

  

  render() {
    return (
      <div>
        hello from my coupons
      </div>
    );
  }
}

export default MyCoupons;
