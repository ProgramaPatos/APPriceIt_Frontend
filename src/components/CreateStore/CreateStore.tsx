import "./CreateStore.scss";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { FormEventHandler, useState } from "react";
import useUser from "../../hooks/useUser";

type LoginInputFieldProps = TextFieldProps & { endIcon: React.ReactNode };

const LoginInputField: React.FC<LoginInputFieldProps> = (props) => {
  const { id, label, value, onChange, ...other } = props;
  return (
    <TextField
      id={id}
      label={label}
      required={true}
      value={value}
      onChange={onChange}
      {...other}
    />
  );
};

export function CreateStore() {
  const [description, setDescription] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");

  const { createStore } = useUser();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (storeName) {
      createStore({
        store_name: storeName,
        store_description: description ? description : "",
        store_appuser_id: 1,
        store_lat: 4.636866196500524,
        store_lon: -74.0835964893141,
        store_schedule: "[1970-01-01 9:00, 1970-01-01 18:00]",
      });
    }
  };

  return (
    <>
      <div className="createStore">
        <h1 className="storeFormTitle">Crear Tienda</h1>
        <div className="storeFormContainer">
          <form onSubmit={handleSubmit}>
            <label htmlFor="storeName"></label>
            <input
              type="text"
              name="storeName"
              id="storeName"
              placeholder="Nombre de la tienda"
              onChange={(e) => setStoreName(e.target.value)}
            />
            <div className="SimpleSeparator"></div>
            <label htmlFor="description"></label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Descripción de la tienda"
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="SimpleSeparator" />
            {/* hay que hacer algo asi pero para la tienda creada
          {userStatus === AuthStatus.LOGGING_IN && <strong>Cargando...</strong>} 
          {hasAuthError && <strong>Error de autenticación</strong>}*/}
            <button className="Button" type="submit">
              Crear Tienda
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
