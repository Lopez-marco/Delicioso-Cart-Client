import React from "react";
import { Card, Row, Col, Image } from "antd";
import { GeoResponse } from "./GeolocationInterface";
import UpdateStoreModal from "./UpdateStoreModal";

export interface FavoriteStoreProps {
  store: Function;
}

export interface FavoriteStoreState {
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
  lat: number;
  lng: number;
  favorite_store: string;
}

class FavoriteStore extends React.Component<
  FavoriteStoreProps,
  FavoriteStoreState
> {
  constructor(props: FavoriteStoreProps) {
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
      lat: 0,
      lng: 0,
      favorite_store: "",
    };
  }

  componentDidMount() {
    this.geolocation();
  }

  geolocation() {
    fetch(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww",
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((json: GeoResponse) => {
        console.log(json.location);
        let store = localStorage.getItem("favorite_store");

        this.setState({
          lat: json.location.lat,
          lng: json.location.lng,
          favorite_store: store ? store : "",
        });
      });
  }

  componentDidUpdate() {
    this.favoriteStore();
  }

  favoriteStore() {
    if (this.state.lat && !this.state.icon) {
      fetch(
        `http://localhost:3001/fav/${this.state.lat}/${this.state.lng}/${this.state.favorite_store}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((json) => {
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
  }
  render() {
    return (
      <div>
        <Card
          className="cardback"
          hoverable
          size="small"
          title="
          Your Nearest Favorite Store"
          style={{
            width: 400,

            // marginBottom: 46,
            borderRadius: 10,
            cursor: "default",
          }}
        >
          <Row gutter={[2, 2]}>
            <Col span={6}>
              <Image width={65} height={80} src={this.state.icon} />
            </Col>
            <Col span={14}>
              <p>
                {this.state.name}
                <br />
                {this.state.vicinity}
                <br />
                {this.state.opening_hours === true ? "Open" : "Close"}{" "}
              </p>
              <UpdateStoreModal
                store={this.props.store}
                favoritestore={this.favoriteStore}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default FavoriteStore;
