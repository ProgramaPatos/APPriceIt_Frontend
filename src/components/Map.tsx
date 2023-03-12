import * as React from 'react';
import Map, {NavigationControl} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

function Map() {
  return (
    <div className="Map">
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: -74.086294,
          latitude: 4.638243,
          zoom: 14
        }}
        style={{width: "100%", height: " calc(100vh - 77px)"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=adwU4Tce1NNStPubalmv"
      >
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
}

export default Map;