import React from "react";
import { Row } from "antd";
import { MyCouponResult } from "./myCouponInterface";
import MyCouponsCards from "./myCouponsCards";
import APIURL from "../../../helpers/environment";

export interface MyCouponsProps {
  token: string;
}

export interface MyCouponsState {
  MyCoupon: MyCouponResult[];
}

class MyCoupons extends React.Component<MyCouponsProps, MyCouponsState> {
  constructor(props: MyCouponsProps) {
    super(props);
    this.state = { MyCoupon: [] };
    this.Allcoupons = this.Allcoupons.bind(this);
  }

  componentDidMount() {
    this.Allcoupons();
  }

  Allcoupons() {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    fetch(`${APIURL}/coupons/addedcoupons`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((res) => res.json())
      .then((json: MyCouponResult[]) => {
        console.log(json);
        this.setState({
          MyCoupon: json,
        });
      });
  }

  render() {
    return (
      <div>
        <Row gutter={[18, 16]} justify="center">
          {this.state.MyCoupon.length > 0 ? (
            this.state.MyCoupon.map(
              (Mycoupons: MyCouponResult, index: number) => (
                <MyCouponsCards
                  fetchCoupons={this.Allcoupons}
                  myCouponCards={Mycoupons}
                  key={index}
                  token={this.props.token}
                />
              )
            )
          ) : (
            <></>
          )}
        </Row>
      </div>
    );
  }
}

export default MyCoupons;
