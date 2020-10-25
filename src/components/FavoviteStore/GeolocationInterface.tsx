export interface Location {
  lat: number;
  lng: number;
}

export interface GeoResponse {
  location: Location;
  accuracy: number;
}
