import React from "react";
import FavoriteStore from "./FavoriteStore";
import { GeoResponse, Location } from "./GeolocationInterface";

export interface GeolocationProps {
  url: string;
}

export interface GeolocationState {
  lat: number;
  lng: number;
}

class Geolocation extends React.Component<GeolocationProps, GeolocationState> {
  constructor(props: GeolocationProps) {
    super(props);
    this.state = { lat: 0, lng: 0 };
  }

  componentDidMount() {
    fetch(this.props.url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((json: GeoResponse) => {
        console.log(json.location);
        this.setState({
          lat: json.location.lat,
          lng: json.location.lng,
        });
      });
  }

  //   StoreURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lat},${this.state.lng}&radius=32186&type=supermarket&keyword=wholefoods&key=AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww`;
  //   console.log(StoreURL),

  render() {
    return (
      <div>
        {this.state.lat > 0 && this.state.lng ? (
          <FavoriteStore
            url={`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lat},${this.state.lng}&radius=32186&type=supermarket&keyword=wholefoods&key=AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww`}
          />
        ) : null}
        Hello from Geo ----- latitude {this.state.lat}
        ------ longitude {this.state.lng}
      </div>
    );
  }
}

export default Geolocation;
