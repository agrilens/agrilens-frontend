import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeoMap = ({ data, title }) => {
  const center = [0, 0]; // Default center, adjust as needed

  return (
    <div className="geo-map">
      <h3>{title}</h3>
      <MapContainer
        center={center}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lng]}>
            <Popup>
              {point.name}: Health Score {point.healthScore}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeoMap;
