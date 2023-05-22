import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AuthApi, AuthApiFp, SignInRequestDTO, StoreApi } from "../services/api";
import { AuthStatus, UserContextValue } from "../types/user";
import { Configuration } from "../services/api";
import axios, { AxiosError, AxiosInstance, AxiosInterceptorOptions } from "axios";


const UserContext = createContext<UserContextValue | undefined>(undefined);
UserContext.displayName = "UserContext"



const authenticatedAxiosInstance = axios.create();
const setAccessToken = (newToken: string) => {
  window.localStorage.setItem("accessToken", newToken);
  authenticatedAxiosInstance.defaults.headers.authorization =
    "Bearer " + newToken;
};
const getAccessToken = () => {
  return window.localStorage.getItem("accessToken");
};

const deleteAccessToken = () => {
  window.localStorage.removeItem("accessToken");
  authenticatedAxiosInstance.defaults.headers.authorization = "";
}
const setRefreshToken = (newToken: string) => {
  window.localStorage.setItem("refreshToken", newToken);
};
const getRefreshToken = () => {
  return window.localStorage.getItem("refreshToken");
};
const deleteRefreshToken = () => {
  window.localStorage.removeItem("refreshToken");
}

const unauthenticatedAxiosInstance = axios.create();
const authApi = new AuthApi(
  new Configuration({
    basePath: process.env.REACT_APP_API_BASE_URL,
  }),
  undefined,
  unauthenticatedAxiosInstance
);

const storeApi = new StoreApi(
  new Configuration({
    basePath: process.env.REACT_APP_API_BASE_URL,
  }),
  undefined,
  authenticatedAxiosInstance
);

let didInit = false;


export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userStatus, setUserStatus] = useState<AuthStatus>(getAccessToken() == null ? AuthStatus.UNAUTHENTICATED : AuthStatus.AUTHENTICATED);
  const [hasAuthError, setHasAuthError] = useState(false);

  const signIn = useCallback((requestPayload: SignInRequestDTO) => {

    setUserStatus(AuthStatus.LOGGING_IN);
    authApi.authControllerSignIn(requestPayload)
      .then(
        ({ data: { accessToken, refreshToken } }) => {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setUserStatus(AuthStatus.AUTHENTICATED);
          setHasAuthError(false);
        }
      )
      .catch(
        (err) => {
          deleteAccessToken();
          deleteRefreshToken();
          setHasAuthError(true);
          setUserStatus(AuthStatus.UNAUTHENTICATED);
          console.log(err);
        }
      );
  }, [setAccessToken, setRefreshToken, setUserStatus, setHasAuthError, deleteAccessToken, deleteRefreshToken]);
  // ^ These functions should not change, but it's better to express
  // the dependency.
  const logOut = useCallback(() => {
    deleteAccessToken();
    deleteRefreshToken();
    setUserStatus(AuthStatus.UNAUTHENTICATED);
  }, [deleteAccessToken, deleteRefreshToken, authenticatedAxiosInstance])



  useEffect(() => {
    if (!didInit) {
      const id = (authenticatedAxiosInstance.interceptors.response.use(
        undefined,
        async (error: AxiosError) => {
          const originalRequest = error.config;
          const refreshToken = getRefreshToken();
          if (error.response?.status === 401 && refreshToken && originalRequest) {
            deleteAccessToken();
            setUserStatus(AuthStatus.LOGGING_IN)
            try {
              const { accessToken: newAccessToken } = (
                await authApi.authControllerRefresh({ refreshToken })
              ).data;
              setAccessToken(newAccessToken);
              originalRequest.headers.Authorization = "Bearer " + newAccessToken;
              setUserStatus(AuthStatus.AUTHENTICATED);
              return authenticatedAxiosInstance(originalRequest);
            }
            catch (e) {
              deleteRefreshToken();
              setUserStatus(AuthStatus.UNAUTHENTICATED);
            }
          }
          return Promise.reject(error);
        }
      ));
      didInit = true;
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        id: 1,
        storeApi,
        signIn,
        logOut,
        userStatus,
        hasAuthError
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
