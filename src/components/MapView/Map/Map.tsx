import React from "react";
import { useEffect, useRef, useState } from "react";
import maplibregl, { Map, MapEvent, MapMouseEvent, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.scss";
import { StoreResponseDTO } from "../../../services/api";
import { useGeolocated } from "react-geolocated";
import useStoreApi from "../../../hooks/useStoreApi";
import useUser from "../../../hooks/useUser";

function MyMap() {
  const mapContainerRef = useRef(null);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated();
  const [coordenates, setCoordenates] = useState(coords ? { lat: coords.latitude, lng: coords.longitude } : { lat: 0, lng: 0 });
  const [map, setMap] = useState<Map | null>(null);
  const { storeApi } = useStoreApi();
  const [marker, setMarker] = useState<Marker | null>(null);
  const [stores, setStores] = useState<Marker[]>([]);
  const { isAuthenticated } = useUser();

  const handleMapClick = (evt: MapMouseEvent) => {
    setCoordenates({ lat: evt.lngLat.lat, lng: evt.lngLat.lng });
  };

  const changeStores = (newStores: Marker[]) => {
    stores.forEach((m) => {
      m.remove();
    });
    setStores(newStores);
  }


  useEffect(() => {
    marker?.setLngLat([coordenates.lng, coordenates.lat]);
    // console.log("ref", mapContainerRef);
    map?.flyTo({
      center: [coordenates.lng, coordenates.lat]
    });

    if (!isAuthenticated) {
      alert("Loggeate para ver tiendas");
      changeStores([]);
      return;
    }

    storeApi.storeControllerSearchStores(coordenates.lat, coordenates.lng, 500)
      .then(
        ({ data }) => {
          if (map) {
            const newStores = data.map((store) => {
              const storeMarker = new maplibregl.Marker()
                .setLngLat([
                  store.store_location.coordinates[0],
                  store.store_location.coordinates[1],
                ]);
              storeMarker.addTo(map);

              return storeMarker;
            });
            changeStores(newStores);
          }

        }
      )
      .catch((err) => {
        changeStores([]);
      })

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

      // new maplibregl.Marker({ color: "#FF0000" })
      //   .setLngLat([-74.086294, 4.638243])
      //   .addTo(newMap);

      const marker = new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([coordenates.lng, coordenates.lat])
        .addTo(newMap);
      setMarker(marker);

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

export default MyMap;
