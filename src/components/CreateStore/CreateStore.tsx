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
  const [open, setOpen] = useState<string>("");
  const [close, setClose] = useState<string>("");
  const date = new Date();

  const { createStore } = useUser();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let currentDate = date.toJSON().slice(0, 10);
    if (storeName) {
      createStore({
        store_name: storeName,
        store_description: description ? description : "",
        store_appuser_id: 1,
        store_lat: 4.636866196500524,
        store_lon: -74.0835964893141,
        store_schedule:
          "[" +
          currentDate +
          " " +
          open +
          ", " +
          currentDate +
          " " +
          close +
          "]",
      });
    }
  };

  return (
    <>
      <div className="createStore">
        <h1 className="storeFormTitle">Nueva Tienda</h1>
        <div className="storeFormContainer">
          <form onSubmit={handleSubmit}>
            <p className={`createStoreInputLabel`}> Nombre de la tienda </p>
            <label htmlFor="storeName"></label>

            <input
              type="text"
              name="storeName"
              id="storeName"
              placeholder=""
              className={`createStoreInputContainer`}
              onChange={(e) => {
                setStoreName(e.target.value);
              }}
            />

            <p className="createStoreInputLabel"> Descripción de la tienda </p>
            <label htmlFor="description"></label>
            <textarea
              name="description"
              id="description"
              className={`createStoreInputContainer description`}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {/* <input type="text" name="" placeholder="" /> */}
            <p className="createStoreInputLabel"> Horario de la tienda </p>
            <div className="createStoreSchedule">
              <label htmlFor="schedule1"></label>
              <input
                type="time"
                name="schedule1"
                id="schedule1"
                className={`createStoreInputContainer time`}
                placeholder=""
                onChange={(e) => setOpen(e.target.value)}
              />

              <div className="createStoreInputSeparator"></div>

              <label htmlFor="schedule2"></label>
              <input
                type="time"
                name="schedule2"
                id="schedule2"
                className={`createStoreInputContainer time`}
                placeholder=""
                onChange={(e) => setClose(e.target.value)}
              />
            </div>

            <div className="SimpleSeparator" />
            {/* hay que hacer algo asi pero para la tienda creada
          {userStatus === AuthStatus.LOGGING_IN && <strong>Cargando...</strong>} 
          {hasAuthError && <strong>Error de autenticación</strong>}*/}
            <button className="createStoreButton" type="submit">
              Crear Tienda
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
