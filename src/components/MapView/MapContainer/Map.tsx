import React from "react";
import { useEffect, useRef, useState } from "react";
import maplibregl, { Map, MapEvent, MapMouseEvent, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.scss";
import { StoreResponseDTO } from "../../../services/api";
import { useGeolocated } from "react-geolocated";
import useStoreApi from "../../../hooks/useStoreApi";
import useUser from "../../../hooks/useUser";

function MyMapContainer() {
  const mapContainerRef = useRef(null);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated();
  const [coordenates, setCoordenates] = useState(
    coords
      ? { lat: coords.latitude, lng: coords.longitude }
      : { lat: 0, lng: 0 }
  );
  const [map, setMap] = useState<Map | null>(null);
  const { storeApi } = useStoreApi();
  const [marker, setMarker] = useState<Marker | null>(null);
  const [stores, setStores] = useState<Marker[]>([]);
  const { isAuthenticated } = useUser();

  const createMarker = (lat: number, lng: number, map: any, color = "") => {
    const marker = new maplibregl.Marker({ color: color })
      .setLngLat([lng, lat])
      .addTo(map);
    setMarker(marker);
    return marker;
  };

  const handleMapClick = (evt: MapMouseEvent) => {
    if (
      coordenates.lat === evt.lngLat.lat &&
      coordenates.lng === evt.lngLat.lng
    )
      return;
    setCoordenates({ lat: evt.lngLat.lat, lng: evt.lngLat.lng });
  };

  const changeStores = (newStores: Marker[]) => {
    stores.forEach((m) => {
      m.remove();
    });
    setStores(newStores);
  };

  async function plotStoresData() {
    if (!isAuthenticated) {
      alert("Loggeate para ver tiendas");
      changeStores([]);
      return;
    }

    storeApi
      .storeControllerSearchStores(coordenates.lat, coordenates.lng, 500)
      .then(({ data }) => {
        if (map) {
          const newStores = data.map((store) => {
            const storeMarker = new maplibregl.Marker().setLngLat([
              store.store_location.coordinates[0],
              store.store_location.coordinates[1],
            ]);
            storeMarker.addTo(map);

            return storeMarker;
          });
          changeStores(newStores);
        }
      })
      .catch((err) => {
        changeStores([]);
      });
  }

  useEffect(() => {
    marker?.setLngLat([coordenates.lng, coordenates.lat]);
    // console.log("ref", mapContainerRef);
    map?.flyTo({
      center: [coordenates.lng, coordenates.lat],
    });

    plotStoresData();
  }, [coordenates]);

  useEffect(() => {
    // console.log(coords);
    if (coords) {
      setCoordenates({ lat: coords.latitude, lng: coords.longitude });
    }
  }, [coords]);

  useEffect(() => {
    console.log({ isGeolocationAvailable, isGeolocationEnabled, coords });
    console.log("ref", mapContainerRef);
    if (mapContainerRef.current) {
      const newMap = new maplibregl.Map({
        container: mapContainerRef.current,
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=HWu5MQaWC0VG5MdG9IxM",
        center: [coordenates.lng, coordenates.lat],
        zoom: 14,
      });
      setMap(newMap);

      newMap.addControl(new maplibregl.NavigationControl({}), "bottom-right");
      newMap.on("click", handleMapClick);

      createMarker(coordenates.lat, coordenates.lng, newMap, "#FF0000");

      let stores: StoreResponseDTO[] = [];
    }
    return () => {
      stores.forEach((m) => {
        m.remove();
      });
      map?.remove();
    };
  }, []);

  return (
    <>
      <div ref={mapContainerRef} className="map" />;
    </>
  );
}

export default MyMapContainer;
