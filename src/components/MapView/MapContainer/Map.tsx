import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Map, {
  Layer,
  MapRef,
  Marker,
  Source,
  ViewState,
  ViewStateChangeEvent,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.scss";
import { useGeolocated } from "react-geolocated";
import Loading from "../Loading/Loading";
import EnableGeolocation from "../EnableGeolocation/EnableGeolocation";
import useUser from "../../../hooks/useUser";
import useStoreApi from "../../../hooks/useStoreApi";
import { useQuery } from "react-query";
import { getDistance } from "geolib";
import GeoJSON from "geojson";
import { AuthStatus } from "../../../types/user";
import { StoreResponseDTO } from "../../../services/api";
import { SideBarContext } from "../../GenericSideBar/GenericSideBar";
import "../../InfoBar/InfoBar.scss";
import { StoreDisplay } from "../../StoreDisplay/StoreDisplay";
import '../../InfoBar/InfoBar.scss';
import MarkerSVG from '../../../Img/priceMarker.svg';


const getQueryDistance = (mapRef: MapRef | null) => {
  const bounds = mapRef?.getBounds();
  if (!bounds) {
    return 500;
  }
  return Math.max(
    getDistance(bounds.getNorthEast(), bounds.getNorthWest()),
    getDistance(bounds.getNorthEast(), bounds.getSouthEast())
  );
};

// const StoreDisplay: FC<{ store: StoreResponseDTO }> = ({ store }) => {
//   const { storeApi } = useStoreApi();
//   const { data: storeInfo } = useQuery(
//     ["storeProducts", store.store_id],
//     async () => {
//       const res = await storeApi.storeControllerGetStoreProducts(
//         store.store_id
//       );
//       return res.data;
//     }
//   );
//   return (
//     <div className="InfoBarContainer">
//       <h1 className="InfoBarMainTitle">{store.store_name}</h1>
//       <h2 className="InfoBarMainSubTitle">{store.store_description}</h2>
//       {storeInfo?.map((product) => (
//         <div key={product.product_id}>
//           <div className="InfoCard">
//             <div className="InfoCardHeader">
//               <div className="InfoCardTitle">{product.product_name}</div>
//             </div>

//             <div className="InfoCardBody">
//               <div className="InfoCardSubtitle">
//                 {product.product_description}
//               </div>
//               <p className="InfoCardSubtitle">Precios</p>
//               <div className="InfoCardPrice">
//                 {product.product_prices.map((price) => (
//                   <div key={price.price_id}>
//                     <div className="InfoCardPriceValue">
//                       ${price.price_value}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

type MyMapContainerProps = {
  setStore: (store: StoreResponseDTO) => void;
  isSearching: boolean;
  setIsSearching: (b: boolean) => void;
  searchId: number | null;
};
const MyMapContainer: FC<MyMapContainerProps> = ({
  setStore,
  isSearching,
  setIsSearching,
  searchId,
}) => {
  const { userStatus } = useUser();
  const { storeApi } = useStoreApi();
  const setSideBar = useContext(SideBarContext);

  const mapRef = useRef<MapRef>(null);


  const initialViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14,
  };
  const [viewState, setViewState] = useState<
    Partial<ViewState> & { longitude: number; latitude: number }
  >({
    ...initialViewState,
  });
  const [queriedViewState, setQueriedViewState] = useState<
    Partial<ViewState> & { longitude: number; latitude: number }
  >(viewState);

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
  const { data: stores } = useQuery(
    ["stores", queriedViewState, searchId],
    async () => {
      const dis = getQueryDistance(mapRef.current);
      const res = await storeApi.storeControllerSearchStores(
        queriedViewState.latitude,
        queriedViewState.longitude,
        dis,
        searchId ?? undefined
      );
      return res.data;
    },
    {
      retry: false,
      enabled:
        userStatus == AuthStatus.AUTHENTICATED &&
        isGeolocationAvailable &&
        !geoIsLoading,
    }
  );

  type StoreGeoJSONProp = { name: string, store: string };
  const storesGeoJSON = useMemo(() => {
    const result = {
      type: 'FeatureCollection' as const,
      features: stores?.map(
        (store) => ({
          type: "Feature" as const,
          geometry: store.store_location,
          properties: { name: store.store_name, store: JSON.stringify(store) },
        })) ?? [],
    } as GeoJSON.FeatureCollection<GeoJSON.Point, StoreGeoJSONProp>;
    return result;
  }, [stores]);


  const onMapLoad = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.on("click", "point", (e) => {
        if (e.features) {
          const props = e.features[0].properties as StoreGeoJSONProp;
          const store = JSON.parse(props.store) as StoreResponseDTO;
          setSideBar(() => <StoreDisplay store={store} />);
        }
      });

      const Img = new Image();

      // Image src loading is async, and the onload function must be specified beforehand
      Img.onload = () => {
        map.addImage("priceMarker", Img);
      };

      Img.src = MarkerSVG;

    }
  }, []);

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
        mapStyle={process.env.REACT_APP_MAP_STYLE_URL}
        onMove={onMove}
        onMoveEnd={onMoveEnd}
        onLoad={onMapLoad}
      >
        <Source id="stores" type="geojson" data={storesGeoJSON}>
          <Layer
            id="point"
            type="symbol"
            layout={{
              "icon-image": "priceMarker",
              "icon-anchor": "bottom",
              "text-field": ["get", "name"],
              "text-anchor": "top",
            }}
          />
        </Source>
      </Map>
    </>
  );
};

export default MyMapContainer;
