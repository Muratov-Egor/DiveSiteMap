"use client";

import { useDiveSites } from "../context/DiveSitesContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { markerIcons } from "./MarkerIcons"; 

const DiveSitesMap = () => {
  const { diveSites } = useDiveSites();

  return (
    <div className="w-screen h-screen">
      <MapContainer 
        center={[7.6028, 98.3687]} 
        zoom={14} 
        className="w-full h-full rounded-lg"
      >
        <TileLayer 
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png" 
        />
        {diveSites.map((site) => (
          <Marker 
            key={site.id} 
            position={[site.lat, site.lng]}
            icon={site.visited ? markerIcons.visited : markerIcons.default} 
          >
            <Popup>
              <strong>{site.name}</strong>
              <br />
              {site.description || "Нет описания"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DiveSitesMap;
