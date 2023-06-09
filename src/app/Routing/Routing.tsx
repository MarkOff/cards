import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Layout } from "layout/Layout";
import { Login } from "features/auth/Login/Login";
import { Register } from "features/auth/Register/Register";
import { CheckEmail } from "features/auth/RecoveryPassword/CheckEmail/CheckEmail";
import { CreateNewPassword } from "features/auth/RecoveryPassword/CreateNewPassword/CreateNewPassword";
import { ForgotPassword } from "features/auth/RecoveryPassword/ForgotPassword/ForgotPassword";
import React from "react";
import { Profile } from "features/Profile/Profile";
import { useAppSelector } from "common/hooks";
import { Packs } from "features/packs/Packs";

const PrivateRoutes = () => {
  const isLogin = useAppSelector(state => state.auth.isLogin)

  return isLogin ? <Outlet/> : <Navigate to={'/login'} />
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/check-email",
        element: <CheckEmail />
      },
      {
        path: "/set-new-password/:token",
        element: <CreateNewPassword />
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/cards",
        element: <div>Card's</div>
      },
      {
        path: "/learn",
        element: <div>Learn</div>
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/packs",
        element: <Packs/>
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/profile",
            element: <Profile/>
          },
        ]
      }
    ]
  },
]);