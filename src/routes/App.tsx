import React from "react";

import Profile from "../components/Profile/Profile";
import { SideBarMenu } from "../components/SideBar/Menu/SideBarMenu";
import MyMap from "../components/MapView/MapContainer/Map";
import "./App.css";
import { SideBarMenuItem, SideMenuCard, StoreApi } from "../types/types";

import { useState, useEffect } from "react";
import { UserContextProvider } from "../contexts/UserContext";
import MyMapContainer from "../components/MapView/MapContainer/Map";
import { Search } from "../components/MapView/SearchBar/Search";
import Prueba from "../components/prueba/Prueba";

function App() {
  const [viewPanel, setViewPanel] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [store, setStore] = useState<StoreApi>({
    store_location: {
      type: "Point",
      coordinates: [-74.091117035, 4.63663201],
    },
    store_id: 7974,
    store_name: "UNAL una tienda",
    store_description: "una tienda de la UN",
    store_schedule: "string",
    store_creation_time: "2023-04-21T20:14:01.539Z",
    store_appuser_id: 1,
    store_distance: 0,
  });

  const card: SideMenuCard = {
    id: "card01",
    displayName: "Usuario Juan",
    title: "Usuario",
    photoURL:
      "https://media.tycsports.com/files/2022/06/14/440403/las-20-mejores-fotos-de-perfil-para-tu-cuenta-de-free-fire_w416.webp",
    url: "/",
  };

  //se supone que desde un child de markers debo llamar a la funcion que me trae una tienda y la guardo en un estado

  // const exampleStore: StoreApi = {
  //   store_location: {
  //     type: "Point",
  //     coordinates: [-74.091117035, 4.63663201],
  //   },
  //   store_id: 7974,
  //   store_name: "Hemeroteca Nacional",
  //   store_description: "Repositorio de revistas de la UN",
  //   store_schedule: "string",
  //   store_creation_time: "2023-04-21T20:14:01.539Z",
  //   store_appuser_id: 1,
  //   store_distance: 0,
  // };

  // setStore(exampleStore);

  // hasta aqui deberia ir en el child de markers y deberia llamar a la funcion que me trae una tienda y la guardo en un estado

  return (
    <UserContextProvider>
      <div className="Container">
        <Search
          searchName={store.store_name}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
        />

        <MyMapContainer />

        {/* <Header /> */}
        <Profile card={card} />

        <SideBarMenu
          card={card}
          viewPanel={viewPanel}
          setViewPanel={setViewPanel}
        />
        <Prueba store={store} setIsSearch={setIsSearch} isSearch={isSearch} />
      </div>
    </UserContextProvider>
  );
}

export default App;
