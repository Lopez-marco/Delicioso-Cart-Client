import React from "react";
import axios from "axios";
import { CouponsResponse, Item } from "./Couponsinterface";
import CouponCards from "./CouponCards";
import { Row } from "antd";

export interface CouponsParentProps {
  token: string;
}

export interface CouponsParentState {
  couponsvalue: Item[];
}

class CouponsParent extends React.Component<
  CouponsParentProps,
  CouponsParentState
> {
  constructor(props: CouponsParentProps) {
    super(props);
    this.state = { couponsvalue: [] };
  }
  // componentDidMount() {
  //   const parseString = require("xml2js").parseString;
  // var xml = `http://rss.coupons.com/xmlserve.asp?go=13306iq3710`;
  // parseString(xml, function (err: any, result: CouponsResponse) {
  //   console.dir(result);
  // });
  //   var url = "http://rss.coupons.com/xmlserve.asp?go=13306iq3710";
  //   fetch(url)
  //     .then((response) => response.text())
  //     .then((responseText) => {
  //       parseString(responseText, function (err: any, result: CouponsResponse) {
  //         console.log(result);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("fetch", err);
  //     });
  // }

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://rss.coupons.com/xmlserve.asp?go=13306iq3710",
        {
          headers: new Headers({
            Accept: "text/html",
            "content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            "Access-Control-Allow-Headers": "Content-Type",
          }),
        }
      )
      .then((d) => {
        var parseString = require("xml2js").parseString;
        var xml = d.data;
        parseString(xml, (err: any, result: CouponsResponse) => {
          console.dir(result);
          this.setState({
            couponsvalue: result.coupons.item,
          });
        });
      });
  }
  render() {
    return (
      <div>
        <Row gutter={[18, 16]} justify="center">
          {this.state.couponsvalue.length > 0 ? (
            this.state.couponsvalue.map((coupons: Item, index: number) => (
              <CouponCards
                couponsbox={coupons}
                key={index}
                token={this.props.token}
              />
            ))
          ) : (
            <></>
          )}
        </Row>
      </div>
    );
  }
}

export default CouponsParent;
