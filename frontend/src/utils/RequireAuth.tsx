import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireAuth: React.FC = () => {
    const { authToken } = useContext(AuthContext);
    if (!authToken) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default RequireAuth;
