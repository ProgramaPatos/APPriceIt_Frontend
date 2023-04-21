import { Map, NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./scssStyles/Map.scss";
import { getStoreWithinDistance } from "../services/api/stores";
import { useState, useEffect } from "react";
// import useFetch from './hooks/useFetch';

function MyMap({ lat, lng }: any) {
  const [initialStores, setInitialStores] = useState({
    store_id: Number,
    store_name: String,
    store_location: {
      type: String,
      coordinates: [-74.0883559, 4.6449991],
    },
    store_description: String,
    store_schedule: String,
    store_creation_time: Date,
    store_appuser_id: Number,
  });

  useEffect(() => {
    console.log("lat: " + lat + " lng: " + lng);
    if (lat != 0 && lng != 0) {
      // console.log("lat: " + lat + " lng: " + lng);
      // getStoreWithinDistance(lat, lng, 1000).then((data: any) => {
      //   setInitialStores(data);
      //   console.log(data);
      // });

      setInitialStores([
        {
          store_id: 7722,
          store_name: "La Tienda de Julieta",
          store_location: {
            type: "Point",
            coordinates: [-74.0883559, 4.6449991],
          },
          store_description: null,
          store_schedule: null,
          store_creation_time: "2023-04-19T21:49:25.303Z",
          store_appuser_id: 1,
        },
      ]);
    }

    console.log(initialStores);
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
