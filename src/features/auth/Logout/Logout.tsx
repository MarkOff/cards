import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { Navigate, useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLogin)

  const onSubmit = () =>
    dispatch(authThunks.logout()).unwrap().then(() => {
      navigate("/login")
    }
  );

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  return (
    <div>
      <button onClick={onSubmit}>Logout</button>
    </div>
  );
};

