import React from "react";
import { useEffect, useRef, useState } from "react";
import maplibregl, { Map, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.scss";
import { SideMenuCard, SideBarMenuItem } from "../../../types/types";
import SidePanel from "../../SidePanel/SidePanel";
import {
  FcAdvertising,
  FcPlus,
  FcSearch,
  FcSettings,
  FcHome,
  FcDownLeft,
} from "react-icons/fc";
import { SideBarMenu } from "../../../components/SideBar/Menu/SideBarMenu";

function MyMap({ lat, lng }: any) {
  const mapContainerRef = useRef(null);
  const [viewPanel, setViewPanel] = useState(false);
  const [coordenates, setCoordenates] = useState({ lat: 0, lng: 0 });
  const [marker, setMarker] = useState<Marker | null>(null);
  function putMarket(evt: any) {
    console.log(evt.lngLat.lng, evt.lngLat.lat);
    setCoordenates({ lat: evt.lngLat.lat, lng: evt.lngLat.lng });
    if (viewPanel === false) {
      setViewPanel(true);
    }
  }

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

      map.addControl(new maplibregl.NavigationControl({}), "bottom-right");
      map.on("click", putMarket);

      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([-74.086294, 4.638243])
        .addTo(map);

      const marker = new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([coordenates.lng, coordenates.lat])
        .addTo(map);
      setMarker(marker);

      initialStores.forEach((store) => {
        const elem = document.createElement("div");
        elem.className = "marker";
        elem.style.background = "red";
        elem.style.width = "10px";
        elem.style.height = "20px";

        elem.addEventListener("click", function () {
          window.alert("aquí está la tienda");
        });

        new maplibregl.Marker(elem)
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

  useEffect(() => {
    if (marker != null) {
      marker.setLngLat([coordenates.lng, coordenates.lat]);
    }
  }, [coordenates]);

  const items: SideBarMenuItem[] = [
    {
      id: "1",
      label: "Home",
      icon: FcHome,
      url: "/",
    },

    {
      id: "2",
      label: "Añadir",
      icon: FcPlus,
      url: "/",
    },

    {
      id: "3",

      label: "Busqueda Avanzada",
      icon: FcSearch,
      url: "/",
    },

    {
      id: "4",
      label: "Ajustes",
      icon: FcSettings,
      url: "/",
    },

    {
      id: "5",
      label: "Salir",
      icon: FcDownLeft,
      url: "/",
    },
    {
      id: "6",
      label: "Create",
      icon: FcAdvertising,
      url: "/stores", //TODO: Change this or make it functional
    },
  ];

  const card: SideMenuCard = {
    id: "card01",
    displayName: "Usuario Juan",
    title: "Usuario",
    photoURL:
      "https://media.tycsports.com/files/2022/06/14/440403/las-20-mejores-fotos-de-perfil-para-tu-cuenta-de-free-fire_w416.webp",
    url: "/",
  };

  return (
    <>
      <div ref={mapContainerRef} className="map" />;
      <SideBarMenu items={items} card={card} viewPanel={viewPanel} />
      {/* <SidePanel viewPanel={viewPanel} setViewPanel={setViewPanel} /> */}
    </>
  );
}

export default MyMap;
