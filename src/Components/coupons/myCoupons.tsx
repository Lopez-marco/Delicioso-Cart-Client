import React from "react";

export interface myCouponsProps {}

export interface myCouponsState {}

class myCoupons extends React.Component<myCouponsProps, myCouponsState> {
  constructor(props: myCouponsProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return <div>Hello from my coupons 2</div>;
  }
}

export default myCoupons;
