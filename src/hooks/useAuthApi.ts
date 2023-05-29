import { useContext } from "react"
import UserContext from "../contexts/UserContext"


const useAuthApi = () => {
    const userCtxVal = useContext(UserContext);
    if (userCtxVal == undefined) {
        throw new Error("useStoreApi must be within UserContextProvider")
    }
    const { authApi } = userCtxVal;
    return { authApi };
}
export default useAuthApi;
