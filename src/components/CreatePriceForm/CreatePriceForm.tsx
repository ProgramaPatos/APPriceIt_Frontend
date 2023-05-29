import { FC, FormEventHandler, useContext, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai";
import useStoreApi from "../../hooks/useStoreApi";
import { PriceResponseDto, ProductResponseDTO, StoreAssignPriceDTO, StoreResponseDTO } from "../../services/api";
import { SideBarContext } from "../GenericSideBar/GenericSideBar";
import { StoreDisplay } from "../StoreDisplay/StoreDisplay";
import './CreatePriceForm.scss';

type props = {
    productId: number;
    storeId: number;
}

export const CreatePriceForm: FC<props> = ({ productId, storeId }) => {
    const [clicked, setClicked] = useState(false);
    const [price, setPrice] = useState("0");
    const { storeApi } = useStoreApi();
    const { setSideBar } = useContext(SideBarContext);

    if (!clicked) {
        return (
            <div>
                <AiOutlinePlus
                    onClick={() => {
                        setClicked(true);
                    }}
                />
            </div>);
    }

    const handleSubmit: FormEventHandler = async (e) => {

        e.preventDefault();
        const payload: StoreAssignPriceDTO = {
            product_price: Number(price)
        };
        await storeApi.storeControllerAssignPrice(storeId, productId, payload);
        setSideBar(() => <StoreDisplay storeId={storeId} />)

    };
    return (
        <form className="priceForm" onSubmit={handleSubmit}>
            <span>Pon tu precio $</span>
            <input
                className="priceFormInput"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
        </form>
    );

}
