import React from "react";
import Header from "../components/MapView/Header/Header";
import Profile from "../components/Profile/Profile";
import { SideBarMenu } from "../components/SideBar/Menu/SideBarMenu";
import MyMap from "../components/MapView/Map/Map";
import "./App.css";
import { SideBarMenuItem, SideMenuCard } from "../types/types";
import {
  FcAdvertising,
  FcPlus,
  FcSearch,
  FcSettings,
  FcHome,
  FcDownLeft,
} from "react-icons/fc";
import { useState, useEffect } from "react";
import { UserContextProvider } from "../contexts/UserContext";
function App() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
      console.log(
        "lat: " + currentLocation.lat + " lng: " + currentLocation.lng
      );
    }
  }, []);

  const items: SideBarMenuItem[] = [
    {
      id: "1",
      label: "Home",
      icon: FcHome,
      url: "/",
    },

    {
      id: "2",
      label: "Añadir",
      icon: FcPlus,
      url: "/",
    },

    {
      id: "3",

      label: "Busqueda Avanzada",
      icon: FcSearch,
      url: "/",
    },

    {
      id: "4",
      label: "Ajustes",
      icon: FcSettings,
      url: "/",
    },

    {
      id: "5",
      label: "Salir",
      icon: FcDownLeft,
      url: "/",
    },
    {
      id: "6",
      label: "Create",
      icon: FcAdvertising,
      url: "/stores", //TODO: Change this or make it functional
    },
  ];

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
        <MyMap lat={currentLocation.lat} lng={currentLocation.lng} />
        {/* <Header />*/}
        <Profile card={card} />

        {/* <SideBarMenu items={items} card={card} /> */}
      </div>
    </UserContextProvider>
  );
}

export default App;
