import "./CreateStore.scss";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { FC, FormEventHandler, useContext, useState } from "react";
import useUser from "../../hooks/useUser";
import useStoreApi from "../../hooks/useStoreApi";
import { SideBarContext } from "../GenericSideBar/GenericSideBar";
import { StoreDisplay } from "../StoreDisplay/StoreDisplay";


type CreateStoreProps = {
  lon: number;
  lat: number;
  refresh: () => void;
}

export const CreateStore: FC<CreateStoreProps> = ({ lon, lat, refresh }) => {
  const [description, setDescription] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [open, setOpen] = useState<string>("");
  const [close, setClose] = useState<string>("");
  const { storeApi } = useStoreApi();
  const { setSideBar } = useContext(SideBarContext);
  const date = new Date();

  const enabled = (description !== "") && (storeName !== "");
  // console.log(enabled);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let currentDate = date.toJSON().slice(0, 10);
    if (storeName) {
      const res = await storeApi.storeControllerCreateStore({
        store_name: storeName,
        store_description: description ? description : "",
        store_lat: lat,
        store_lon: lon,
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

      refresh()
      setSideBar(() => <StoreDisplay storeId={res.data.store_id} />);

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
              className="createStoreInputContainer"
              onChange={(e) => {
                setStoreName(e.target.value);
              }}
            />

            <p className="createStoreInputLabel"> Descripción de la tienda </p>
            <label htmlFor="description"></label>
            <textarea
              name="description"
              id="description"
              className={"createStoreInputContainer description"}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className="createStoreInputLabel"> Horario de la tienda </p>
            <div className="createStoreSchedule">
              <label htmlFor="schedule1"></label>
              <input
                type="time"
                name="schedule1"
                id="schedule1"
                className={"createStoreInputContainer time"}
                onChange={(e) => setOpen(e.target.value)}
              />

              <div className="createStoreInputSeparator"></div>

              <label htmlFor="schedule2"></label>
              <input
                type="time"
                name="schedule2"
                id="schedule2"
                className={"createStoreInputContainer time"}
                onChange={(e) => setClose(e.target.value)}
              />
            </div>

            <div className="SimpleSeparator" />

            <button
              className="createStoreButton"
              disabled={!enabled}
              type="submit"
            >
              Crear Tienda
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
