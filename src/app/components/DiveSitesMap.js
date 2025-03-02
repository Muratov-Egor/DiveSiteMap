"use client";

import { useDiveSites } from "../context/DiveSitesContext";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { markerIcons } from "./MarkerIcons";
import DiveSitePopup from "./DiveSitePopup";

const DiveSitesMap = ({ onSelectSite }) => {
  const { diveSites } = useDiveSites();
  
  return (
    <div className="w-[75%] h-screen fixed left-0 top-0">
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
            <DiveSitePopup site={site} onSelectSite={onSelectSite} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DiveSitesMap;