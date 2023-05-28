import { FC, useState } from "react";
import useStoreApi from "../../hooks/useStoreApi";
import { useQuery } from "react-query";
import { StoreResponseDTO } from "../../services/api";
import "./ComponentDisplay.scss";
import { AiOutlineClose } from "react-icons/ai";
import { RxPencil1 } from "react-icons/rx";
import { InlineEdit } from "../InlineEdit/InlineEdit";
import { MultilineEdit } from "../MultilineEdit/MultilineEdit";

export const ComponentDisplay: FC<{ store: StoreResponseDTO }> = ({
  store,
}) => {
  const [isUpdatingEnable, setIsUpdatingEnable] = useState(false);
  const [nameComponent, setNameComponent] = useState(store.store_name);
  const [descriptionComponent, setDescriptionComponent] = useState("");

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
                console.log("borrar tienda");
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
                  store.store_description
                    ? store.store_description
                    : descriptionComponent
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
            onClick={() =>
              console.log(
                "name" + nameComponent + "description" + descriptionComponent
              )
            }
          >
            <p> Guardar </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
