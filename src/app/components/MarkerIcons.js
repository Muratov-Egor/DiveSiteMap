import L from "leaflet";

export const markerIcons = {
  default: new L.Icon({
    iconUrl: "/spot.png", 
    iconSize: [50, 50], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41] 
  }),
  visited: new L.Icon({
    iconUrl: "/visited_spot.png", 
    iconSize: [50, 50], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41] 
  }),
};