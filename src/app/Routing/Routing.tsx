import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Layout } from "layout/Layout";
import { Login } from "features/auth/UtilsForAuth/Login/Login";
import { CheckEmail } from "features/auth/UtilsForAuth/RecoveryPassword/CheckEmail/CheckEmail";
import { CreateNewPassword } from "features/auth/UtilsForAuth/RecoveryPassword/CreateNewPassword/CreateNewPassword";
import { ForgotPassword } from "features/auth/UtilsForAuth/RecoveryPassword/ForgotPassword/ForgotPassword";
import React from "react";
import { Profile } from "features/profile/Profile";
import { useAppSelector } from "common/hooks";
import { Packs } from "features/packs/Packs";
import { selectIsLogin } from "features/auth/auth.selector";
import { Register } from "features/auth/UtilsForAuth/Register/Register";

const PrivateRoutes = () => {
  const isLogin = useAppSelector(selectIsLogin);

  return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        element: <PrivateRoutes />,
        children: [
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/packs",
            element: <Packs />
          }
        ]
      }
    ]
  }
]);