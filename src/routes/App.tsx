import React from "react";

import Profile from "../components/Profile/Profile";
import { SideBarMenu } from "../components/SideBar/Menu/SideBarMenu";
import MyMap from "../components/MapView/MapContainer/Map";
import "./App.css";
import { SideBarMenuItem, SideMenuCard } from "../types/types";

import { useState, useEffect } from "react";
import { UserContextProvider } from "../contexts/UserContext";
import MyMapContainer from "../components/MapView/MapContainer/Map";
import { Search } from "../components/MapView/SearchBar/Search";
import Prueba from "../components/prueba/Prueba";

function App() {
  const [viewPanel, setViewPanel] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");

  const card: SideMenuCard = {
    id: "card01",
    displayName: "Usuario Juan",
    title: "Usuario",
    photoURL:
      "https://media.tycsports.com/files/2022/06/14/440403/las-20-mejores-fotos-de-perfil-para-tu-cuenta-de-free-fire_w416.webp",
    url: "/",
  };

  return (
    <UserContextProvider>
      <div className="Container">
        <Search
          searchName={"el nombre del producto?"}
          setSearchName={setSearchName}
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
        <Prueba setIsSearch={setIsSearch} isSearch={isSearch} />
      </div>
    </UserContextProvider>
  );
}

export default App;
