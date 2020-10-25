import React from "react";
import { Card, Row, Col } from "antd";
import { Result, StoreResponce } from "../StoreInterface";
import { GeoResponse } from "../GeolocationInterface";
import Findstorelist from "./Findstorelist";
import Menubar from "../../MainPage/Menubar";

export interface FindStoreProps {
  store: Function;
}

export interface FindStoreState {
  storefounder: Result[];
  lat: number;
  lng: number;
  favorite_store: string;
  name: string;
}

class FindStore extends React.Component<FindStoreProps, FindStoreState> {
  constructor(props: FindStoreProps) {
    super(props);
    this.state = {
      storefounder: [],
      lat: 0,
      lng: 0,
      favorite_store: "",
      name: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww",
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((json: GeoResponse) => {
        console.log(json.location);
        this.setState({
          lat: json.location.lat,
          lng: json.location.lng,
        });
        let store = localStorage.getItem("favorite_store");
        this.setState({
          favorite_store: store ? store : "",
        });
      });
  }

  componentDidUpdate() {
    // console.log(this.state.favorite_store);
    if (this.state.lat && !this.state.name) {
      fetch(
        `http://localhost:3001/near/${this.state.lat}/${this.state.lng}/${this.state.favorite_store}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((json: StoreResponce) => {
          console.log(json.results);
          this.setState({
            storefounder: json.results,
            name: json.results[0].name,
          });
        });
    }
  }

  render() {
    return (
      <div>
        <br />
        <Row gutter={[4, 6]} justify="center">
          <Col></Col>
        </Row>
        <Row gutter={[4, 48]} justify="center">
          <Col></Col>
        </Row>

        <Row gutter={[6, 16]} justify={"center"}>
          <Col span={4}>
            <Menubar />{" "}
          </Col>
          <Col span={1}></Col>
          <Col span={18}>
            <Card
              className="cardback"
              size="small"
              title="Stores"
              style={{ width: 1000, borderRadius: 10 }}
            >
              <Row gutter={[18, 16]} justify="center">
                {this.state.storefounder.length > 0 ? (
                  this.state.storefounder.map(
                    (Store: Result, index: number) => (
                      <Findstorelist
                        FoundStores={Store}
                        key={index}
                        lat={this.state.lat}
                        lng={this.state.lng}
                      />
                    )
                  )
                ) : (
                  <></>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FindStore;
