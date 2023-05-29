import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { MdArrowDropDown } from "react-icons/md";
import useStoreApi from "../../hooks/useStoreApi";
import { useQuery } from "react-query";
import { StoreResponseDTO } from "../../services/api";
import "./InfoBar.scss";
interface InfoCardProps {
  store: StoreResponseDTO
  viewPanel: boolean;
  setViewPanel: (value: boolean) => void;
}
export function InfoBar({
  viewPanel,
  setViewPanel,
  store,
}: InfoCardProps) {


  //call store and its products with the id
  const { store_name: storeName, store_description: storeDescription } = store;
  const { storeApi } = useStoreApi();

  const { data: storeInfo } = useQuery(["storeProducts", store.store_id], async () => {
    const res = await storeApi.storeControllerGetStoreProducts(store.store_id);
    return res.data;
  })


  const [isOPen, setIsOpen] = useState<boolean>(false);
  const handleClick = (): void => {
    setIsOpen(!isOPen);
    setViewPanel(false);
  };
  // <div className="InfoBurgerButton">
  //   <button className="BurgerButton" onClick={handleClick}>
  //     {isOPen || viewPanel ? (
  //       <AiOutlineClose style={{ height: "2.7vh", width: "100%" }} />
  //     ) : (
  //       <HiMenu style={{ height: "2.7vh", width: "100%" }} />
  //     )}
  //   </button>
  // </div>
  return (
    <div
      className={`InfoDisplay ${isOPen || viewPanel ? "expanded" : "collapsed"
        }`}
    >

      {isOPen || viewPanel ? (
        <div className="InfoBarContainer">
          <h1 className="InfoBarMainTitle">{storeName}</h1>
          <h2 className="InfoBarMainSubTitle">{storeDescription}</h2>

          {storeInfo?.map((product) => {
            return (
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
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

  // const storeInfo = [
  //   {
  //     product_appuser_id: 1,
  //     product_id: 4,
  //     product_name: "Handcrafted Bronze Shoes",
  //     product_description:
  //       "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
  //     product_creation_time: "2023-04-25T21:34:35.384Z",
  //     product_availability: 5,
  //     product_prices: [
  //       {
  //         price_id: 198,
  //         price_value: 21132,
  //         price_appuser_id: 1,
  //         price_creation_time: "2023-04-25T21:38:26.805357",
  //       },
  //     ],
  //   },
  //   {
  //     product_appuser_id: 1,
  //     product_id: 6,
  //     product_name: "Bespoke Wooden Shoes",
  //     product_description:
  //       "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
  //     product_creation_time: "2023-04-25T21:34:35.384Z",
  //     product_availability: 14,
  //     product_prices: [
  //       {
  //         price_id: 195,
  //         price_value: 42064,
  //         price_appuser_id: 1,
  //         price_creation_time: "2023-04-25T21:38:26.805357",
  //       },
  //       {
  //         price_id: 196,
  //         price_value: 54836,
  //         price_appuser_id: 1,
  //         price_creation_time: "2023-04-25T21:38:26.805357",
  //       },
  //     ],
  //   },
  //   {
  //     product_appuser_id: 1,
  //     product_id: 8,
  //     product_name: "Gorgeous Wooden Bike",
  //     product_description:
  //       "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
  //     product_creation_time: "2023-04-25T21:34:35.384Z",
  //     product_availability: 7,
  //     product_prices: [
  //       {
  //         price_id: 197,
  //         price_value: 30636,
  //         price_appuser_id: 1,
  //         price_creation_time: "2023-04-25T21:38:26.805357",
  //       },
  //     ],
  //   },
  // ];
