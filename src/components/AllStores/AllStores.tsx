import "./AllStores.scss";
import { AiOutlineClose } from "react-icons/ai";
import { RxPencil1 } from "react-icons/rx";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { StoreResponseDTO } from "../../services/api";
import { InlineEdit } from "../InlineEdit/InlineEdit";
import { ComponentDisplay } from "../ComponentDisplay/ComponentDisplay";
import useUserApi from "../../hooks/useUserApi";

export function AllStores() {
  const { userApi } = useUserApi();
  const [stores, setStores] = useState<StoreResponseDTO[]>([]);
  const [counter, setCounter] = useState(0);
  const [isUpdatingEnable, setIsUpdatingEnable] = useState(false);
  const [nameStore, setNameStore] = useState("");
  useEffect(
    () => {
      userApi.userControllerGetMyStores().then(
        ({ data }) => {
          setStores((data as unknown) as StoreResponseDTO[]);
        }
      )
    }, []);


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
