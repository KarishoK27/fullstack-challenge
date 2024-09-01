import React, { createContext, useState, ReactNode } from "react";

interface CurrentUserContextType {
    authToken: string;
    setAuthToken: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    callLogout: () => void;
}

interface Props {
    children: ReactNode;
}

export const AuthContext = createContext<CurrentUserContextType>(
    {} as CurrentUserContextType
);

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string>(() =>
        localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token") || "")
            : ""
    );
    const [loading, setLoading] = useState<boolean>(false);

    // call logout

    function callLogout() {
        setAuthToken("");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider
            value={{
                setAuthToken,
                authToken,
                callLogout,
                setLoading,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
