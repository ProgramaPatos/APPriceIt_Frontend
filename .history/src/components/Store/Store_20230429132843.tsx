import React from "react";
import { Buttons, Container } from "./Store.style";
import "./Store.scss";
import { Modal, TextField, Button } from "@mui/material";

function Tienda() {
  return (
    <div className="Container">
      <h1> Tienda </h1>
      <button className="Buttons"> Añadir </button>
    </div>
  );
}

export default Tienda;
