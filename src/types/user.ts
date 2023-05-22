import { AxiosInstance } from "axios";
import { Dispatch, SetStateAction } from "react";
import { AuthApi, SignInRequestDTO, StoreApi } from "../services/api";

export enum AuthStatus {
    AUTHENTICATED = "AUTHENTICATED",
    UNAUTHENTICATED = "UNAUTHENTICATED",
    LOGGING_IN = "LOGGING_IN"
}

export type UserContextValue = {
    id: number;
    signIn: (request: SignInRequestDTO) => void;
    logOut: () => void;
    storeApi: StoreApi;
    userStatus: AuthStatus;
    hasAuthError: boolean;
}
