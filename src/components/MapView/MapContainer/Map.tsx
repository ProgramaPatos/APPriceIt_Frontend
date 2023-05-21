import { useCallback, useEffect, useRef, useState } from "react";
import Map, { ViewState, ViewStateChangeEvent } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useGeolocated } from "react-geolocated";
import Loading from "../Loading/Loading";
import EnableGeolocation from "../EnableGeolocation/EnableGeolocation";
import { TRUE } from "sass";

// const EnableGeolocation = () => {
//   return <div>por favor habilita tu ubicacion xs dsbdhsdh la gerencia</div>;
// };

// const LoadingGeolocation = () => {
//   return <div>Buscandote</div>;
// };

export default function MyMapContainer() {
  const initialViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14,
  };
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    ...initialViewState,
  });

  const onMove = useCallback<(e: ViewStateChangeEvent) => void>(
    ({ viewState }) => {
      setViewState(viewState);
    },
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onGeoSuccess = useCallback((position: GeolocationPosition) => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    setViewState((prev) => ({ ...prev, latitude, longitude }));
    setIsLoading(false);
  }, []);

  const geo = useGeolocated({ onSuccess: onGeoSuccess });
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = geo;

  return (
    <>
      {/* {isLoading && isGeolocationEnabled && <Loading />} */}
      {!(isGeolocationAvailable && isGeolocationEnabled) && (
        <EnableGeolocation />
      )}
      <Map
        initialViewState={initialViewState}
        {...viewState}
        onMove={onMove}
        mapLib={maplibregl}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=HWu5MQaWC0VG5MdG9IxM"
      />
    </>
  );
}
