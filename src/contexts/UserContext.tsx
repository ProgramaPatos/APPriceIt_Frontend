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
import axios, { AxiosError, AxiosInstance, AxiosInterceptorOptions } from "axios";

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [{ authApi, unauthenticatedAxiosInstance }] = useState(() => {
    const unauthenticatedAxiosInstance = axios.create();
    const authApi = new AuthApi(
      new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
      }),
      undefined,
    );
    return {
      authApi,
      unauthenticatedAxiosInstance
    }
  });

  const [authenticatedAxiosInstance] = useState(() => {
    return axios.create();
  });
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
        authenticatedAxiosInstance
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
