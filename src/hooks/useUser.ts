import axios, { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { AuthApiFp, SignInRequestDTO } from "../services/api";

export enum AuthStatus {
    AUTHENTICATED = "AUTHENTICATED",
    UNAUTHENTICATED = "UNAUTHENTICATED",
    LOGGING_IN = "LOGGING_IN"
}
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
        authApi,
        authenticatedAxiosInstance
    } = userCtxVal;

    const [userStatus,setUserStatus] = useState<AuthStatus>(accessToken == null ? AuthStatus.UNAUTHENTICATED : AuthStatus.AUTHENTICATED);
    // TODO: send the error message to the login form
    const [hasAuthError, setHasAuthError] = useState(false);

    const signIn = useCallback((requestPayload: SignInRequestDTO) => {

        setUserStatus(AuthStatus.LOGGING_IN);
        authApi.authControllerSignIn(requestPayload)
            .then(
                ({ data: { accessToken, refreshToken } }) => {
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                    setHasAuthError(false);
                }
            )
            .catch(
                (err) => {
                    deleteAccessToken();
                    deleteRefreshToken();
                    setHasAuthError(true);
                    console.log(err);
                }
            );
    }, [setAccessToken, setRefreshToken, setUserStatus, setHasAuthError, deleteAccessToken, deleteRefreshToken]);
    // ^ These functions should not change, but it's better to express
    // the dependency.
    const logOut = useCallback(() => {
        deleteAccessToken();
        deleteRefreshToken();
    }, [deleteAccessToken, deleteRefreshToken])

  const onAuthError = useCallback<<T>(error: AxiosError) => Promise<T>>(
    async (error) => {
      const originalRequest = error.config;
      console.log("hmmm");
      console.log(error)

      if (error.response?.status === 401 && refreshToken && originalRequest) {
          deleteAccessToken();
          setUserStatus(AuthStatus.LOGGING_IN)
          try {
            const { accessToken: newAccessToken } = (
                await authApi.authControllerRefresh({ refreshToken })
            ).data;
            setAccessToken(newAccessToken);
            return authenticatedAxiosInstance(originalRequest);
          }
          catch (e) {
            deleteRefreshToken();
          }
      }
      return Promise.reject(error);
    }, [authApi, authenticatedAxiosInstance,setUserStatus]
  );
  useEffect(() => {
    authenticatedAxiosInstance.interceptors.response.use(
      undefined,
      onAuthError
    );
  }, [authenticatedAxiosInstance,onAuthError]);
    useEffect(() => {
      if (accessToken !== null) {
          setUserStatus(AuthStatus.AUTHENTICATED);
      }
      else {
          setUserStatus(AuthStatus.UNAUTHENTICATED);
      }
    },[accessToken]);

    return {
        signIn,
        logOut,
        userStatus,
        hasAuthError
    }





}

export default useUser;
