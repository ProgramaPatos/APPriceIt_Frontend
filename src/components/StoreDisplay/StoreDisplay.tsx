import { FC, useState } from "react";
import useStoreApi from "../../hooks/useStoreApi";
import { useQuery } from "react-query";
import { StoreResponseDTO } from "../../services/api";
import "./StoreDisplay.scss";

export const StoreDisplay: FC<{ store: StoreResponseDTO }> = ({ store }) => {
  const { storeApi } = useStoreApi();
  const [isMyStore, setIsMyStore] = useState<boolean>(true);
  const { data: storeInfo } = useQuery(
    ["storeProducts", store.store_id],
    async () => {
      const res = await storeApi.storeControllerGetStoreProducts(
        store.store_id
      );
      return res.data;
    }
  );
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
                {product.product_prices.map((price) => (
                  <div key={price.price_id}>
                    <div className="InfoCardPriceValue">
                      ${price.price_value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      {isMyStore ? (
        <div
          className="StoreDIsplayButton"
          onClick={() => console.log("cambio a crear producto")}
        >
          <p> Añadir Producto</p>
        </div>
      ) : null}
    </div>
  );
};
