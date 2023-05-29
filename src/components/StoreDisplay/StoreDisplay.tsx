import { FC, useContext, useState } from "react";
import useStoreApi from "../../hooks/useStoreApi";
import { useQuery } from "react-query";
import { StoreResponseDTO } from "../../services/api";
import "./StoreDisplay.scss";
import { SideBarContext } from "../GenericSideBar/GenericSideBar";
import { CreateProduct } from "../CreateProduct/CreateProduct";
import { CreatePriceForm } from "../CreatePriceForm/CreatePriceForm";

export const StoreDisplay: FC<{ storeId: number }> = ({ storeId }) => {
  const { storeApi } = useStoreApi();
  const [isMyStore, setIsMyStore] = useState<boolean>(true);
  const { setSideBar } = useContext(SideBarContext);
  const { data } = useQuery(
    ["storeProducts", storeId],
    async () => {
      const prod = await storeApi.storeControllerGetStoreProducts(
        storeId
      );
      const storeReq = await storeApi.storeControllerGetStore(storeId);
      return { storeInfo: prod.data, store: storeReq.data };
    }
  );
  if (!data) {
    return (<span>Cargando..</span>);
  }
  const { storeInfo, store } = data;
  return (
    <div className="InfoBarContainer">
      <h1 className="InfoBarMainTitle">{store.store_name}</h1>
      <h2 className="InfoBarMainSubTitle">{store.store_description}</h2>
      {storeInfo?.map((product) => (
        <div key={product.product_id}>
          <div className="InfoCard">
            <div className="InfoCardHeader">
              <div className="InfoCardTitle">{product.product_name}</div>
            </div>

            <div className="InfoCardBody">
              <div className="InfoCardSubtitle">
                {product.product_description}
              </div>
              <p className="InfoCardSubtitle">Precios</p>
              <div className="InfoCardPrice">
                {product.product_prices.map((price) => price && (<div key={price.price_id} >
                  <div className="InfoCardPriceValue">
                    ${price.price_value}
                  </div>
                </div>)
                )}
              </div>
              <CreatePriceForm storeId={storeId} productId={product.product_id} />
            </div>
          </div>
        </div>
      ))}
      {isMyStore ? (
        <div
          className="StoreDIsplayButton"
          onClick={() => {
            setSideBar(() => <CreateProduct storeId={storeId} />)
          }}
        >
          <p> Añadir Producto</p>
        </div>
      ) : null}
    </div>
  );
};
