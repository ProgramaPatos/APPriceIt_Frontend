import "./AllStores.scss";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { StoreResponseDTO } from "../../services/api";
export function AllStores() {
  const { getMyStores } = useUser();
  const stores = getMyStores;

  const [counter, setCounter] = useState(0);

  //   const handleClick = () => {
  //     setCounter((v) => v + 1);
  //     setSideBar(() => <div>{counter}</div>);
  //   };

  return (
    <div className="InfoDisplay">
      {/* <button onClick={handleClick}>click</button> */}
      <div className="InfoBarContainer">
        <h1 className="InfoBarMainTitle">Tus tiendas</h1>
        {stores.map((store: StoreResponseDTO) => {
          return (
            <div key={store.store_id}>
              <div className="InfoCard">
                <div className="InfoCardHeader">
                  <div className="InfoCardTitle">{store.store_name}</div>
                </div>

                <div className="InfoCardBody">
                  <div className="InfoCardSubtitle">
                    {store.store_description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
