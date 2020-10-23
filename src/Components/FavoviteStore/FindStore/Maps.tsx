import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Result } from "../StoreInterface";

export interface MapsProps {
  lat: number;
  lng: number;
  FoundStores: Result;
}

export interface MenuofComponentsState {}

const Maps: React.SFC<MapsProps> = (props) => {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: props.lat,
    lng: props.lng,
  };

  const position = {
    lat: props.FoundStores.geometry?.location.lat,
    lng: props.FoundStores.geometry?.location.lng,
  };

  const [, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback() {}, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyC8SxWx5derhovl8nfdFbYxhMR5r_mH7ww">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker onLoad={onLoad} position={position} label={"Store"} />
          <Marker onLoad={onLoad} position={center} label={"You"} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Maps;
