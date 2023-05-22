import { useContext } from "react"
import UserContext from "../contexts/UserContext"


const useProductApi = () => {
    const userCtxVal = useContext(UserContext);
    if (userCtxVal == undefined) {
        throw new Error("useStoreApi must be within UserContextProvider")
    }
    const { productApi } = userCtxVal;
    return { productApi };
}
export default useProductApi;
