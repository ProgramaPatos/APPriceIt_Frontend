import "./CreateProduct.scss";
import React, { FormEventHandler, useContext, useState } from "react";
import useProductApi from "../../hooks/useProductApi";
import useStoreApi from "../../hooks/useStoreApi";
import { SideBarContext } from "../GenericSideBar/GenericSideBar";
import { StoreDisplay } from "../StoreDisplay/StoreDisplay";


export const CreateProduct: React.FC<{ storeId: number }> =
  ({ storeId }) => {
    const [description, setDescription] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const { productApi } = useProductApi();
    const { storeApi } = useStoreApi();
    const { setSideBar } = useContext(SideBarContext);

    const enabled = (description !== "") && (productName !== "");

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      if (productName) {
        const res = await productApi.productControllerCreateProduct({
          product_name: productName,
          product_description: description ? description : "",
        });
        console.log(res);


        await storeApi.storeControllerAddProduct(storeId, res.data.product_id, {});
        setSideBar(() => <StoreDisplay storeId={storeId} />);
      }
    };
    console.log(enabled);

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
                  setProductName(e.target.value);
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
              <div className="SimpleSeparator" />
              <button disabled={!enabled} className="CreateProductButton" type="submit" >
                Crear Producto
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
