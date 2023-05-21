import * as React from "react";
import { useState } from "react";
import { SideMenuCard } from "../../types/types";
import { InfoBar } from "../InfoBar/InfoBar";
import "./Prueba.scss";

interface PruebaProps {
  isSearch: boolean;
  setIsSearch: (value: boolean) => void;
}

export default function Prueba({ setIsSearch, isSearch }: PruebaProps) {
  const handleClick = (): void => {
    setIsSearch(!isSearch);
  };
  const [viewPanel, setViewPanel] = useState<boolean>(false);
  const card: SideMenuCard = {
    id: "card01",
    displayName: "Usuario Juan",
    title: "Usuario",
    photoURL:
      "https://media.tycsports.com/files/2022/06/14/440403/las-20-mejores-fotos-de-perfil-para-tu-cuenta-de-free-fire_w416.webp",
    url: "/",
  };

  return (
    <div className="Prueba">
      esta es una prueba para ver como funcionaria el infoBar
      <div>
        <div
          className="PruebaIcon"
          onClick={() => {
            setViewPanel(!viewPanel);
            handleClick();
          }}
        ></div>
        <div
          className="PruebaIcon"
          onClick={() => {
            setViewPanel(!viewPanel);
            handleClick();
          }}
        ></div>
        <div
          className="PruebaIcon"
          onClick={() => {
            setViewPanel(!viewPanel);
            handleClick();
          }}
        ></div>
      </div>
      <InfoBar
        coord={
          "no se aqui iria una solo la info de la tienda y los demas productos asi no sea el que estoy seleccionando si? algo asi"
        }
        viewPanel={isSearch}
        setViewPanel={setIsSearch}
      />
    </div>
  );
}
