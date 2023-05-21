import React from "react";
import Header from "../components/MapView/Header/Header";
import Profile from "../components/Profile/Profile";
import { SideBarMenu } from "../components/SideBar/Menu/SideBarMenu";
import MyMap from "../components/MapView/MapContainer/Map";
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
import { UserContextProvider } from "../contexts/UserContext";
import { QueryClientProvider, QueryClient } from "react-query";
import MyMapContainer from "../components/MapView/MapContainer/Map";


const queryClient = new QueryClient();
function App() {

  const card: SideMenuCard = {
    id: "card01",
    displayName: "Usuario Juan",
    title: "Usuario",
    photoURL:
      "https://media.tycsports.com/files/2022/06/14/440403/las-20-mejores-fotos-de-perfil-para-tu-cuenta-de-free-fire_w416.webp",
    url: "/",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <div className="Container">
          <MyMapContainer />
          <Profile card={card} />
        </div>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
