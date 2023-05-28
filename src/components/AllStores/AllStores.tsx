import "./AllStores.scss";
import { AiOutlineClose } from "react-icons/ai";
import { RxPencil1 } from "react-icons/rx";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { StoreResponseDTO } from "../../services/api";
import { InlineEdit } from "../InlineEdit/InlineEdit";
import { ComponentDisplay } from "../ComponentDisplay/ComponentDisplay";

export function AllStores() {
  const { getMyStores } = useUser();
  const stores = getMyStores;

  const [counter, setCounter] = useState(0);
  const [isUpdatingEnable, setIsUpdatingEnable] = useState(false);
  const [nameStore, setNameStore] = useState("");

  return (
    <div className="AllStoresDisplay">
      {/* <button onClick={handleClick}>click</button> */}
      <div className="AllStoresContainer">
        <h1 className="AllStoresMainTitle">Tus tiendas</h1>
        {stores.map((store: StoreResponseDTO) => {
          return <ComponentDisplay store={store} />;
        })}
      </div>
    </div>
  );
}
// }
