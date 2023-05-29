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
import GenericSideBar from "../components/GenericSideBar/GenericSideBar";

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
  const [productSearch, setProductSearch] = useState<number | null>(null);

  const card: SideMenuCard = {
    id: "card01",
    displayName: "Usuario Juan",
    title: "Usuario",
    photoURL:
      "https://media.tycsports.com/files/2022/06/14/440403/las-20-mejores-fotos-de-perfil-para-tu-cuenta-de-free-fire_w416.webp",
    url: "/",
  };

  const [refresh, setRefresh] = useState<() => void>(() => () => {});

  return (
    <QueryClientProvider client={queryClient}>
      <div className="Container">
        <Search
          setSearch={setProductSearch}
        />


        {/* <Header /> */}
        <Profile card={card} />

        <GenericSideBar>
          <SideBarMenu
            card={card}
            viewPanel={viewPanel}
            setViewPanel={setViewPanel}
            refresh={refresh}
          />
          <MyMapContainer
            setStore={setStore}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            searchId={productSearch}
            setRefresh={(f: () => void) => { setRefresh(() => f) }}
          />
        </GenericSideBar>
      </div>
    </QueryClientProvider>
  );
}

// <InfoBar
//   store={store}
//   viewPanel={isSearching}
//   setViewPanel={setIsSearching}
// />
export default App;
