export interface Location {
  name: string;
  coords: [number, number];
}

export interface Route {
  distance: number;
  duration: number;
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
}

export type TravelMode = "driving" | "walking" | "cycling";

export interface RouteOptions {
  index: number;
  route: Route;
  isActive: boolean;
}

