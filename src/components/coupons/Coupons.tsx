import React from "react";
import axios from "axios";
import CouponCards from "./CouponCards";

export interface CouponsProps {}

export interface CouponsState {
  couponsvalue: [];
}

class Coupons extends React.Component<CouponsProps, CouponsState> {
  constructor(props: CouponsProps) {
    super(props);
    this.state = { couponsvalue: [] };
  }
  componentDidMount() {
    axios
      .get("http://rss.coupons.com/xmlserve.asp?go=13306iq3710", {
        headers: new Headers({
          Accept: "text/html",
          "content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT",
          "Access-Control-Allow-Headers": "Content-Type",
        }),
      })
      .then((d) => {
        let p = [];
        var XMLParser = require("react-xml-parser");
        var xml = new XMLParser().parseFromString(d.data);
        console.log(xml);
        let coupons = xml.children[0];
        console.log(coupons);
        this.setState({
          couponsvalue: coupons,
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.couponsvalue}

        {this.state.couponsvalue.length > 0 ? (
          this.state.couponsvalue.map((coupons: any[], index: number) => (
            <CouponCards coupons={coupons} key={index} />
          ))
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Coupons;
