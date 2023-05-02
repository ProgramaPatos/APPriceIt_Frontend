import { AxiosInstance } from "axios";
import { Dispatch, SetStateAction } from "react";
import { AuthApi, StoreApi } from "../services/api";

export type UserContextValue = {
    id: number;
    accessToken: string | null;
    setAccessToken: (newAT: string) => void;
    deleteAccessToken: () => void;
    refreshToken: string | null;
    setRefreshToken: (newAT: string) => void;
    deleteRefreshToken: () => void;
    authApi: AuthApi;
    storeApi: StoreApi;
}
