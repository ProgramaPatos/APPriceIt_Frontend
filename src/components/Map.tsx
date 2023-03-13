
import {Map, NavigationControl} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './scssStyles/Map.scss'


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
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=adwU4Tce1NNStPubalmv"
      >
        <div className='navControl'>
          <NavigationControl position="bottom-right"  />
        </div>
       
      </Map>
    </div>
  );
}

export default MyMap;