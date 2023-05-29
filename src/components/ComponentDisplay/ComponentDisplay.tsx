import { FC, useContext, useState } from "react";
import useStoreApi from "../../hooks/useStoreApi";
import { useQuery } from "react-query";
import { StoreResponseDTO } from "../../services/api";
import "./ComponentDisplay.scss";
import { AiOutlineClose } from "react-icons/ai";
import { RxPencil1 } from "react-icons/rx";
import { InlineEdit } from "../InlineEdit/InlineEdit";
import { MultilineEdit } from "../MultilineEdit/MultilineEdit";
import { SideBarContext } from "../GenericSideBar/GenericSideBar";

export const ComponentDisplay: FC<{ store: StoreResponseDTO }> = ({
  store
}) => {
  const [isUpdatingEnable, setIsUpdatingEnable] = useState(false);
  const [nameComponent, setNameComponent] = useState(store.store_name);
  const [descriptionComponent, setDescriptionComponent] = useState(store.store_description ?? "");
  const { storeApi } = useStoreApi();
  const { setSideBar } = useContext(SideBarContext);

  const handleSubmit = async () => {
    const res = await storeApi.storeControllerUpdateStore(store.store_id, {
      store_name: nameComponent,
      store_description: descriptionComponent,
    });

    setSideBar(null);
  };

  return (
    <div key={store.store_id}>
      <div className="AllStoresCard">
        <div className="AllStoresCardHeader">
          {isUpdatingEnable ? (
            <InlineEdit
              value={nameComponent}
              setValue={setNameComponent}
              isUpdatingEnable={isUpdatingEnable}
            />
          ) : (
            store.store_name
          )}

          <div className="AllStoresCardHeaderLogos">
            <RxPencil1
              onClick={() => {
                setIsUpdatingEnable(!isUpdatingEnable);
              }}
            />
            <AiOutlineClose
              onClick={() => {
                // console.log("borrar tienda");
                //deleteStore(store.store_id);
              }}
            />
          </div>
        </div>

        <div className="AllStoresCardBody">
          <div className="AllStoresCardSubtitle">
            {isUpdatingEnable ? (
              <MultilineEdit
                value={
                  descriptionComponent
                }
                setValue={setDescriptionComponent}
                isUpdatingEnable={isUpdatingEnable}
              />
            ) : (
              store.store_description
            )}
          </div>
        </div>
      </div>
      {isUpdatingEnable ? (
        <div className="StoreDIsplayButtons">
          <div
            className="StoreDIsplayButton"
            onClick={() => setIsUpdatingEnable(!isUpdatingEnable)}
          >
            <p> Descartar </p>
          </div>
          <div></div>
          <div
            className="StoreDIsplayButton"
            onClick={handleSubmit}
          >
            <p> Guardar </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
