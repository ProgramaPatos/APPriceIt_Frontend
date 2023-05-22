import axios, { AxiosError } from "axios";
import { useCallback, useContext, useDebugValue, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { AuthApiFp, SignInRequestDTO } from "../services/api";

const useUser = () => {
  useDebugValue("useUserHook")
  const userCtxVal = useContext(UserContext);
  if (userCtxVal == undefined) {
    throw new Error("useUser must be within UserContextProvider");
  }

  const {
    signIn,
    logOut,
    userStatus,
    hasAuthError
  } = userCtxVal;

  return {
    signIn,
    logOut,
    userStatus,
    hasAuthError
  }
}

export default useUser;
