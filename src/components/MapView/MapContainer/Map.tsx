import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, { Layer, MapRef, Marker, Source, ViewState, ViewStateChangeEvent } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import './Map.scss';
import { useGeolocated } from "react-geolocated";
import Loading from "../Loading/Loading";
import EnableGeolocation from "../EnableGeolocation/EnableGeolocation";
import useUser from "../../../hooks/useUser";
import useStoreApi from "../../../hooks/useStoreApi";
import { useQuery } from "react-query";
import { getDistance } from "geolib";
import GeoJSON from "geojson"
import { AuthStatus } from "../../../types/user";
import { StoreResponseDTO } from "../../../services/api";


const getQueryDistance = (mapRef: MapRef | null) => {
  const bounds = mapRef?.getBounds();
  if (!bounds) {
    return 500;
  }
  return Math.max(
    getDistance(bounds.getNorthEast(), bounds.getNorthWest()),
    getDistance(bounds.getNorthEast(), bounds.getSouthEast()),
  );
}

type MyMapContainerProps = {
  setStore: (store: StoreResponseDTO) => void;
  isSearching: boolean;
  setIsSearching: (b: boolean) => void;
};
const MyMapContainer: FC<MyMapContainerProps> = ({ setStore, isSearching, setIsSearching }) => {
  const { userStatus } = useUser();
  const { storeApi } = useStoreApi();

  const handleClick = (): void => {
    setIsSearching(!isSearching);
  };
  const mapRef = useRef<MapRef>(null);

  const onMapLoad = useCallback(() => {

    console.log("running here");
    if (mapRef.current) {
      console.log("miau");
      mapRef.current.on("click", "point", (e) => {
        console.log(e);
        if (e.features) {
          const store = JSON.parse(e.features[0]!.properties?.store);
          setStore(store);
          handleClick();
        }
      });
    }
  }, []);
  const initialViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14,
  };
  const [viewState, setViewState] =
    useState<Partial<ViewState> & { longitude: number, latitude: number }>({
      ...initialViewState,
    });
  const [queriedViewState, setQueriedViewState] =
    useState<Partial<ViewState> & { longitude: number, latitude: number }>(viewState);

  const onMove = useCallback<(e: ViewStateChangeEvent) => void>(
    ({ viewState }) => {
      setViewState(viewState);
    },
    []
  );


  const onMoveEnd = useCallback<(e: ViewStateChangeEvent) => void>(
    ({ viewState }) => {
      setQueriedViewState(viewState);
    },
    []
  );
  const [geoIsLoading, setGeoIsLoading] = useState<boolean>(true);
  const onGeoSuccess = useCallback((position: GeolocationPosition) => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    setViewState((prev) => ({ ...prev, latitude, longitude }));
    setQueriedViewState((prev) => ({ ...prev, latitude, longitude }));
    setGeoIsLoading(false);
  }, []);
  const geo = useGeolocated({ onSuccess: onGeoSuccess });
  const { isGeolocationAvailable, isGeolocationEnabled } = geo;
  const { data: stores } = useQuery(["stores", queriedViewState], async () => {
    const dis = getQueryDistance(mapRef.current);
    const res = await storeApi.storeControllerSearchStores(queriedViewState.latitude, queriedViewState.longitude, dis);
    return res.data;
  }, {
    retry: false,
    enabled:
      (userStatus == AuthStatus.AUTHENTICATED) &&
      isGeolocationAvailable
      && !geoIsLoading
  });


  const storesGeoJSON = useMemo(() => {
    const result = {
      type: 'FeatureCollection' as const,
      features: stores?.map(
        store => ({
          type: "Feature" as const,
          geometry: store.store_location,
          properties: { store: store }
        })) ?? [],
    } as GeoJSON.FeatureCollection<GeoJSON.Point, { store: StoreResponseDTO }>;
    return result;
  }, [stores]);
  return (
    <>
      {geoIsLoading && isGeolocationEnabled && <Loading />}
      {!(isGeolocationAvailable && isGeolocationEnabled) && (
        <EnableGeolocation />
      )}
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        {...viewState}
        mapLib={maplibregl}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=HWu5MQaWC0VG5MdG9IxM"
        onMove={onMove}
        onMoveEnd={onMoveEnd}
        onLoad={onMapLoad}
      >
        <Source id="stores" type="geojson" data={storesGeoJSON}>
          <Layer
            id="point"
            type="circle"
            paint={{
              'circle-radius': 10,
              'circle-color': '#007cbf'
            }}
          />
        </Source>
      </Map>
    </>
  );
  // <Source id="vehicles" type="geojson" data={storesGeoJSON}>
  //   <Layer
  //     id="point"
  //     type="circle"
  //     paint={{
  //       'circle-radius': 10,
  //       'circle-color': '#007cbf'
  //     }}
  //   />
  // </Source>
  // {stores?.map(({ store_id, store_location }) => {
  //   const [longitude, latitude] = store_location.coordinates;
  //   return (
  //     <Marker
  //       key={store_id}
  //       longitude={longitude}
  //       latitude={latitude}
  //     />
  //   );
  // })}

  // <Source id="vehicles" type="geojson" data={storesGeoJSON}>
  //   <Layer type="symbol"
  //     layout={{
  //       'icon-image': 'vehicle-icon',
  //       'icon-size': 1,
  //     }} />
  // </Source>

  // {storesGeoJSON.features.map(({ geometry, properties }) => {
  //   const [longitude, latitude] = geometry.coordinates;
  //   return (
  //     <Marker
  //       key={properties.id}
  //       longitude={longitude}
  //       latitude={latitude}
  //     />
  //   );
  // })}
}

export default MyMapContainer;
