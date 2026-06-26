import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geoFeatures, mockGeographyData } from "./GeoJson"; // Import GeoJSON and mock data

const getColor = (d) => {
  return d > 100000000 ? '#800026' :
         d > 50000000  ? '#BD0026' :
         d > 20000000  ? '#E31A1C' :
         d > 10000000  ? '#FC4E2A' :
         d > 5000000   ? '#FD8D3C' :
         d > 2000000   ? '#FEB24C' :
         d > 1000000   ? '#FED976' :
                         '#FFEDA0';
}

const style = (feature) => {
  const value = mockGeographyData.find(item => item.id === feature.properties.id)?.value || 0;
  return {
    fillColor: getColor(value),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

const onEachFeature = (feature, layer) => {
  const value = mockGeographyData.find(item => item.id === feature.properties.id)?.value || 0;
  layer.bindPopup(`<b>${feature.properties.name}</b><br/>Population: ${value}`);
}

const ChoroplethMap = ({height}) => {
  return (
    <MapContainer style={{ height: height, width: "100%" }} zoom={3} center={[50, 0]}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={geoFeatures}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default ChoroplethMap;
