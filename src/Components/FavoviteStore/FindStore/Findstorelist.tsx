import * as React from "react";
import { Result } from "../StoreInterface";
import { Card, Row, Col, Image } from "antd";
import Maps from "./Maps";

export interface FindstoreParentProps {
  key: number;
  FoundStores: Result;
  lat: number;
  lng: number;
}

export interface FindstoreParentState {}

class FindstoreParent extends React.Component<
  FindstoreParentProps,
  FindstoreParentState
> {
  constructor(props: FindstoreParentProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Row gutter={[48, 24]} justify="center">
          <Card
            className="cardback"
            size="small"
            style={{ width: 510, height: 500 }}
          >
            <Row gutter={[8, 8]}>
              <Col span={2}>
                <Image
                  width={35}
                  height={40}
                  src={this.props.FoundStores.icon}
                />
              </Col>
              <Col span={12}>
                <p>
                  {this.props.FoundStores.name}
                  <br />
                  {this.props.FoundStores.vicinity}
                  <br />
                  <Row>
                    <Maps
                      lat={this.props.lat}
                      lng={this.props.lng}
                      FoundStores={this.props.FoundStores}
                    />
                  </Row>
                  {/* {this.props.FoundStores.opening_hours = true ? "Open" : "Close"}{" "} */}
                </p>
              </Col>
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}

export default FindstoreParent;
