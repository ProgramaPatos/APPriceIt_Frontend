
import React, {useState} from 'react';
import {Map, NavigationControl, Marker, useMap} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './scssStyles/Map.scss'

import SidePanel from './SidePanel';


function MyMap() {
  const [viewPanel, setViewPanel] = useState(false);
  const [coordenates, setCoordenates] = useState({lat: 0, lng: 0})
  function putMarket(evt: any) {
    console.log(evt.lngLat.lng, evt.lngLat.lat)
    setCoordenates({lat: evt.lngLat.lat, lng: evt.lngLat.lng})
    if(viewPanel === false){
      setViewPanel(true)
    }

    
    
  } 




  return (
    <div className="Map">
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: -74.086294,
          latitude: 4.638243,
          zoom: 14
          
        }}
        onClick={putMarket}
        style={{width: "100%", height: "100%"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=HWu5MQaWC0VG5MdG9IxM"
      >
        <div className='navControl'>
          <NavigationControl position="bottom-right"  />
        </div>

        
        <Marker longitude={coordenates.lng} latitude={coordenates.lat}>
        
        
        </Marker> 
      
      </Map>
      <SidePanel viewPanel={viewPanel} setViewPanel={setViewPanel}/>
    </div>
  );
}

export default MyMap;


