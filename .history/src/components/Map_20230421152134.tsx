import React from "react";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./scssStyles/Map.scss";

function MyMap({ lat, lng }: any) {
  const mapContainerRef = useRef(null);
  const [initialStores, setInitialStores] = useState([
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

  useEffect(() => {
    console.log("lat: " + lat + " lng: " + lng);
    if (lat != 0 && lng != 0) {
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
        {
          store_id: 7734,
          store_name: "Lavandería",
          store_location: {
            type: "Point",
            coordinates: [-74.087622, 4.6451386],
          },
          store_description: null,
          store_schedule: null,
          store_creation_time: "2023-04-19T21:49:25.303Z",
          store_appuser_id: 1,
        },
        {
          store_id: 7735,
          store_name: "Masita's Gourmet",
          store_location: {
            type: "Point",
            coordinates: [-74.087217, 4.6451944],
          },
          store_description: null,
          store_schedule: null,
          store_creation_time: "2023-04-19T21:49:25.303Z",
          store_appuser_id: 1,
        },
      ]);
    }

    if (mapContainerRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=HWu5MQaWC0VG5MdG9IxM",
        center: [-74.086294, 4.638243],
        zoom: 14,
      });

      map.addControl(new maplibregl.NavigationControl({}), "top-right");

      const el = document.createElement("div");
      el.className = "marker";
      el.style.background = "red";
      el.style.width = "10px";
      el.style.height = "20px";

      el.addEventListener("click", function () {
        window.alert("holi");
      });

      new maplibregl.Marker(el).setLngLat([-74.086294, 4.638243]).addTo(map);

      initialStores.forEach((store) => {
        new maplibregl.Marker({ color: "#FF0000" })
          .setLngLat([
            store.store_location.coordinates[0],
            store.store_location.coordinates[1],
          ])
          .addTo(map);

        console.log(typeof [-74.086294, 4.638243]);
        console.log(typeof store.store_location.coordinates);
      });

      return () => {
        map.remove();
      };
    }
  }, []);

  return <div ref={mapContainerRef} className="map" />;
}

export default MyMap;
