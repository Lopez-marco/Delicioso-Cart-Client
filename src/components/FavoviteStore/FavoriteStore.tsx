import React from "react";
import { StoreResponce } from "./StoreInterface";

export interface FavoriteStoreProps {
  url: string;
}

export interface FavoriteStoreState {
  business_status: string;
  icon: string;
  name: string;
  opening_hours: string;
  photos: string;
  place_id: string;
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
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
      opening_hours: "",
      photos: "",
      place_id: "",
      price_level: 0,
      rating: 0,
      reference: "",
      scope: "",
      types: [],
      user_ratings_total: 0,
      vicinity: "",
    };
  }

  componentDidMount() {
    fetch(this.props.url, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((json: StoreResponce) => {
        console.log(json.results);
      });
  }
  render() {
    return <div></div>;
  }
}

export default FavoriteStore;
