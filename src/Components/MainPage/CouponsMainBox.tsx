import React from "react";

export interface CouponsMainBoxProps {}

export interface CouponsMainBoxState {}

class CouponsMainBox extends React.Component<
  CouponsMainBoxProps,
  CouponsMainBoxState
> {
  constructor(props: CouponsMainBoxProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <div></div>;
  }
}

export default CouponsMainBox;
