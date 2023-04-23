import { Map, NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./scssStyles/Map.scss";
import { getStoreWithinDistance } from "../services/api/stores";
import { useState, useEffect } from "react";
// import useFetch from './hooks/useFetch';

function MyMap(lat: any, lng: any) {
  const [initialStores, setInitialStores] = useState([]);

  useEffect(() => {
    getStoreWithinDistance(lat, lng, 1000).then((data: any) => {
      setInitialStores(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="Map">
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: -74.086294,
          latitude: 4.638243,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=HWu5MQaWC0VG5MdG9IxM"
      >
        <div className="navControl">
          <NavigationControl position="bottom-right" />
        </div>
      </Map>
    </div>
  );
}

export default MyMap;
