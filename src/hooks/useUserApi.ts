import { useContext } from "react"
import UserContext from "../contexts/UserContext"


const useUserApi = () => {
    const userCtxVal = useContext(UserContext);
    if (userCtxVal == undefined) {
        throw new Error("useStoreApi must be within UserContextProvider")
    }
    const { userApi } = userCtxVal;
    return { userApi };
}
export default useUserApi;
