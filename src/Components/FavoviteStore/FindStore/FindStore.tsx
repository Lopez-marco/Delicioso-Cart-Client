import React from "react";
import { Card, Row, Col } from "antd";
import { Result, StoreResponce } from "../StoreInterface";
import { GeoResponse } from "../GeolocationInterface";
import Findstorelist from "./Findstorelist";

export interface FindStoreProps {}

export interface FindStoreState {
  storefounder: Result[];
  lat: number;
  lng: number;
  favorite_store: string;
  icon: string;
}

class FindStore extends React.Component<FindStoreProps, FindStoreState> {
  constructor(props: FindStoreProps) {
    super(props);
    this.state = {
      storefounder: [],
      lat: 0,
      lng: 0,
      favorite_store: "",
      icon: "",
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
    if (this.state.lat && !this.state.icon) {
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
            icon: json.results[0].icon,
          });
        });
    }
  }

  render() {
    return (
      <div>
        <Row gutter={[18, 16]}>
          <Col></Col>
        </Row>
        <Row gutter={[18, 16]} justify={"center"}>
          <Card size="small" title="Stores" style={{ width: 1250 }}>
            <Row gutter={[18, 16]} justify="center">
              {this.state.storefounder.length > 0 ? (
                this.state.storefounder.map((Store: Result, index: number) => (
                  <Findstorelist FoundStores={Store} key={index} />
                ))
              ) : (
                <></>
              )}
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}

export default FindStore;
