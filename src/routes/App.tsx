import React from "react";

import Profile from "../components/Profile/Profile";
import { SideBarMenu } from "../components/SideBar/Menu/SideBarMenu";
import MyMap from "../components/MapView/MapContainer/Map";
import "./App.css";
import {
  FcAdvertising,
  FcPlus,
  FcSearch,
  FcSettings,
  FcHome,
  FcDownLeft,
} from "react-icons/fc";
import { SideBarMenuItem, SideMenuCard } from "../types/types";

import { useState, useEffect } from "react";
import { UserContextProvider } from "../contexts/UserContext";
import { QueryClientProvider, QueryClient } from "react-query";
import MyMapContainer from "../components/MapView/MapContainer/Map";
import { Search } from "../components/MapView/SearchBar/Search";
import { StoreResponseDTO } from "../services/api";
import { InfoBar } from "../components/InfoBar/InfoBar";

const queryClient = new QueryClient();

function App() {
  const [viewPanel, setViewPanel] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [store, setStore] = useState<StoreResponseDTO>({
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
      <QueryClientProvider client={queryClient}>
        <div className="Container">
          <Search
            searchName={store.store_name}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />

          <MyMapContainer
            setStore={setStore}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />

          {/* <Header /> */}
          <Profile card={card} />

          <SideBarMenu
            card={card}
            viewPanel={viewPanel}
            setViewPanel={setViewPanel}
          />
          <InfoBar
            store={store}
            viewPanel={isSearching}
            setViewPanel={setIsSearching}
          />
        </div>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
