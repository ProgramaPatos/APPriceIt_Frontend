import "./CreateProduct.scss";
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

export function CreateProduct() {
  const [description, setDescription] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");

  // creo que habria que cambiar a post product por tienda

  const { createProduct } = useUser();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (storeName) {
      createProduct({
        product_name: storeName,
        product_description: description ? description : "",
        product_appuser_id: 1,
      });
    }
  };

  return (
    <>
      <div className="CreateProduct">
        <h1 className="storeFormTitle">Nuevo producto</h1>
        <div className="storeFormContainer">
          <form onSubmit={handleSubmit}>
            <p className={`CreateProductInputLabel`}> Nombre del producto </p>
            <label htmlFor="storeName"></label>

            <input
              type="text"
              name="storeName"
              id="storeName"
              placeholder=""
              className={`CreateProductInputContainer`}
              onChange={(e) => {
                setStoreName(e.target.value);
              }}
            />

            <p className="CreateProductInputLabel">
              {" "}
              Descripción de la tienda{" "}
            </p>
            <label htmlFor="description"></label>
            <textarea
              name="description"
              id="description"
              className={`CreateProductInputContainer description`}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {/* <input type="text" name="" placeholder="" /> */}

            <div className="SimpleSeparator" />
            {/* hay que hacer algo asi pero para la tienda creada
          {userStatus === AuthStatus.LOGGING_IN && <strong>Cargando...</strong>} 
          {hasAuthError && <strong>Error de autenticación</strong>}*/}
            <button className="CreateProductButton" type="submit">
              Crear Producto
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
