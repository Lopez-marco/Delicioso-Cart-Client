import * as React from "react";
import { Result } from "../StoreInterface";
import { Card, Row, Col, Image } from "antd";

export interface FindstoreParentProps {
  key: number;
  FoundStores: Result;
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
        <Row></Row>
        <Row>
          <Card size="small" style={{ width: 310, height: 100 }}>
            <Row gutter={[8, 8]}>
              <Col span={6}>
                <Image
                  width={35}
                  height={40}
                  src={this.props.FoundStores.icon}
                />
              </Col>
              <Col span={14}>
                <p>
                  {this.props.FoundStores.name}
                  <br />
                  {this.props.FoundStores.vicinity}
                  <br />
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
