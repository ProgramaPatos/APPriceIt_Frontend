import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AuthApi, AuthApiFp, StoreApi } from "../services/api";
import type { UserContextValue } from "../types/user";
import { Configuration } from "../services/api";
import axios from "axios";

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [authApi] = useState(() => {
    return new AuthApi(
      new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
      })
    );
  });

  const [authenticatedAxiosInstance] = useState(() => {
    return axios.create();
  });
  // TODO: Maybe Refactor these two as a custom hook
  const [accessToken, setAccessTokenRaw] = useState<string | null>(() =>
    window.localStorage.getItem("accessToken")
  );
  const setAccessToken = (newAT: string) => {
    window.localStorage.setItem("accessToken", newAT);
    setAccessTokenRaw(newAT);
    authenticatedAxiosInstance.defaults.headers.authorization =
      "Bearer " + newAT;
  };
  const deleteAccessToken = () => {
    window.localStorage.removeItem("accessToken");
    setAccessTokenRaw(null);
    authenticatedAxiosInstance.defaults.headers.authorization = "";
  };

  const [refreshToken, setRefreshTokenRaw] = useState<string | null>(() =>
    window.localStorage.getItem("refreshToken")
  );
  const setRefreshToken = (newRT: string) => {
    window.localStorage.setItem("refreshToken", newRT);
    setRefreshTokenRaw(newRT);
  };
  const deleteRefreshToken = () => {
    window.localStorage.removeItem("refreshToken");
    setRefreshTokenRaw(null);
  };

  useEffect(() => {
    authenticatedAxiosInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        console.log("hmmm");
        if (error.response.status === 401 && refreshToken) {
          console.log("hmmm2");
          const { accessToken: newAccessToken } = (
            await authApi.authControllerRefresh({ refreshToken })
          ).data;
          setAccessToken(newAccessToken);
          return authenticatedAxiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }, [authenticatedAxiosInstance]);

  const [storeApi] = useState(() => {
    return new StoreApi(
      new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
      }),
      undefined,
      authenticatedAxiosInstance
    );
  });

  return (
    <UserContext.Provider
      value={{
        id: 1,
        accessToken,
        setAccessToken,
        deleteAccessToken,
        refreshToken,
        setRefreshToken,
        deleteRefreshToken,
        authApi,
        storeApi,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
