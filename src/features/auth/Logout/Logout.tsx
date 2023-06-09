import React from "react";
import { authThunks } from "features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLogin)

  const onSubmit = () =>
    dispatch(authThunks.logout()).unwrap().then(() => {
      navigate("/login")
    }
  );

  // if (!isLoggedIn) {
  //   return <Navigate to={'/login'}/>
  // }

  return (
    <div>
      <button onClick={onSubmit}>Logout</button>
    </div>
  );
};

