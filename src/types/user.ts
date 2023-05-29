import { AxiosInstance } from "axios";
import { Dispatch, SetStateAction } from "react";
import {
  AuthApi,
  ProductApi,
  SignInRequestDTO,
  StoreApi,
  StoreCreateDTO,
  ProductCreateDTO,
  StoreResponseDTO,
  UserApi,
} from "../services/api";

export enum AuthStatus {
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
  LOGGING_IN = "LOGGING_IN",
}

export type UserContextValue = {
  id: number;
  signIn: (request: SignInRequestDTO) => void;
  logOut: () => void;
  createStore: (request: StoreCreateDTO) => void;
  createProduct: (request: ProductCreateDTO) => void;
  getMyStores: StoreResponseDTO[];
  storeApi: StoreApi;
  productApi: ProductApi;
  userApi: UserApi;
  userStatus: AuthStatus;
  authApi: AuthApi;
  hasAuthError: boolean;
};
