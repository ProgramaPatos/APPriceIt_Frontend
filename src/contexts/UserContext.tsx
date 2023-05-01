import { createContext, ReactNode, useCallback, useState } from "react";
import { AuthApi, AuthApiFp } from "../services/api";
import type { UserContextValue } from "../types/user";
import { Configuration } from "../services/api";

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    // TODO: Refactor these two as a custom hook
    const [accessToken, setAccessTokenRaw] = useState<string | null>(
        () => window.localStorage.getItem("accessToken")
    );
    const setAccessToken = (newAT: string) => {
        window.localStorage.setItem("accessToken", newAT);
        setAccessTokenRaw(newAT);
    };
    const deleteAccessToken = () => {
        window.localStorage.removeItem("accessToken");
        setAccessTokenRaw(null);
    }

    const [refreshToken, setRefreshTokenRaw] = useState<string | null>(
        () => window.localStorage.getItem("refreshToken")
    );
    const setRefreshToken = (newRT: string) => {
        window.localStorage.setItem("refreshToken", newRT);
        setRefreshTokenRaw(newRT);
    };
    const deleteRefreshToken = () => {
        window.localStorage.removeItem("refreshToken");
        setRefreshTokenRaw(null);
    }

    const [authAxios,] = useState(
        () => new AuthApi(new Configuration({
            basePath: "http://localhost:3000"
        }))
    );
    console.log(authAxios);




    return (
        <UserContext.Provider value={{
            id: 1,
            accessToken,
            setAccessToken,
            deleteAccessToken,
            refreshToken,
            setRefreshToken,
            deleteRefreshToken,
            authAxios
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
