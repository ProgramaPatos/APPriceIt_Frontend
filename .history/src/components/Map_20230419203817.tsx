
import {Map, NavigationControl} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './scssStyles/Map.scss'

import { useState, useEffect } from 'react';
// import useFetch from './hooks/useFetch';

const [currentLocation, setCurrentLocation] = useState({lat: 0, lng: 0});

useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
}, []);

console.log(currentLocation);



function MyMap() {
  return (
    <div className="Map">
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: -74.086294,
          latitude: 4.638243,
          zoom: 14
        }}
        style={{width: "100%", height: "100%"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=HWu5MQaWC0VG5MdG9IxM"
      >
        <div className='navControl'>
          <NavigationControl position="bottom-right"  />
        </div>
       
      </Map>
    </div>
  );
}

export default MyMap;