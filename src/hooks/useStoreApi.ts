import { useContext } from "react"
import UserContext from "../contexts/UserContext"


const useStoreApi = () => {
    const userCtxVal = useContext(UserContext);
    if (userCtxVal == undefined) {
        throw new Error("useStoreApi must be within UserContextProvider")
    }
    const { storeApi } = userCtxVal;
    return { storeApi };
}
export default useStoreApi;
