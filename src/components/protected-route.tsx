import React, { ReactElement, ReactNode, useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, RouteProps, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";


function RequireAuthentication({ children }: { children: JSX.Element }) {
    const user = useAppSelector((state) => state.auth);
    const location = useLocation();
    if(user.token === '') {
        return <Navigate to="/login" state={{from: location}} />
    } else {
        return children;
    }
}

export default RequireAuthentication;