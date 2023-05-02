import axios from "axios";
import { useCallback, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { AuthApiFp, SignInRequestDTO } from "../services/api";

const useUser = () => {
    const userCtxVal = useContext(UserContext);
    if (userCtxVal == undefined) {
        throw new Error("useUser must be within UserContextProvider");
    }

    const {
        accessToken,
        setAccessToken,
        deleteAccessToken,
        refreshToken,
        setRefreshToken,
        deleteRefreshToken,
        authApi: authAxios
    } = userCtxVal;

    const [isLoading, setIsLoading] = useState(false);
    // TODO: send the error message to the login form
    const [hasAuthError, setHasAuthError] = useState(false);

    const signIn = useCallback((requestPayload: SignInRequestDTO) => {

        setIsLoading(true);
        authAxios.authControllerSignIn(requestPayload)
            .then(
                ({ data: { accessToken, refreshToken } }) => {
                    setIsLoading(false);
                    setHasAuthError(false);
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                }
            )
            .catch(
                (err) => {
                    deleteAccessToken();
                    deleteRefreshToken();
                    setHasAuthError(true);
                    setIsLoading(false);
                    console.log(err);
                }
            );
    }, [setAccessToken, setRefreshToken, setIsLoading, setHasAuthError, deleteAccessToken, deleteRefreshToken]);
    // ^ These functions should not change, but it's better to express
    // the dependency.
    const logOut = useCallback(() => {
        deleteAccessToken();
        deleteRefreshToken();
    }, [deleteAccessToken, deleteRefreshToken])


    return {
        signIn,
        logOut,
        isAuthenticated: accessToken !== null,
        isLoading,
        hasAuthError
    }





}

export default useUser;
