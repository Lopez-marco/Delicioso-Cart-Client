import React from "react";
import FavoriteStore from "./FavoriteStore";
import { GeoResponse } from "./GeolocationInterface";

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

  render() {
    const Geolocation = `http://localhost:3001/faboritestore/${this.state.lat}/${this.state.lng}`;
    return (
      <div>
        {this.state.lat > 0 && this.state.lng ? (
          <FavoriteStore url={Geolocation} />
        ) : null}
      </div>
    );
  }
}

export default Geolocation;
