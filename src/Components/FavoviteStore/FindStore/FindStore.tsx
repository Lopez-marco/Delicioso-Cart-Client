import React from "react";
import { Card, Row, Col, Image, Input } from "antd";
import { StoreResponce } from "../StoreInterface";

const { Search } = Input;

export interface FindStoreProps {}

export interface FindStoreState {
  business_status: string;
  icon: string;
  name: string;
  opening_hours: boolean;
  photos: string;
  place_id: string;
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
  //   isOpen: boolean;
}

class FindStore extends React.Component<FindStoreProps, FindStoreState> {
  constructor(props: FindStoreProps) {
    super(props);
    this.state = {
      business_status: "",
      icon: "",
      name: "",
      opening_hours: true,
      photos: "",
      place_id: "",
      price_level: 0,
      rating: 0,
      reference: "",
      scope: "",
      types: [],
      user_ratings_total: 0,
      vicinity: "",
      //   isOpen: true,
    };
  }

  componentDidMount() {
    fetch(this.props.url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json: StoreResponce) => {
        console.log(json.results);
        this.setState({
          business_status: json.results[0].business_status,
          icon: json.results[0].icon,
          name: json.results[0].name,
          opening_hours: json.results[0].opening_hours.open_now,
          //   photos: json.results[0].photos,
          place_id: json.results[0].place_id,
          price_level: json.results[0].price_level,
          rating: json.results[0].rating,
          reference: json.results[0].reference,
          scope: json.results[0].scope,
          types: json.results[0].types,
          user_ratings_total: json.results[0].user_ratings_total,
          vicinity: json.results[0].vicinity,
        });
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <Card
              hoverable
              size="small"
              title="Find more Grocery Stores"
              extra={<a href="#">More</a>}
              style={{ width: 400, marginTop: 16, borderRadius: 10 }}
            >
              <br />
              <Search
                placeholder="input search text"
                onSearch={(value) => console.log(value)}
                enterButton
              />
              <br />
              <br />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FindStore;
