import React from "react";
import { authThunks } from "features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useActions } from "common/hooks/useActions.ts";

export const Logout = () => {
  const {logout} = useActions(authThunks)
  const navigate = useNavigate();

  const onSubmit = () =>
    logout()
      .unwrap()
      .then(() => {
          navigate("/login");
        }
      );


  return (
    <div>
      <button onClick={onSubmit}>Logout</button>
    </div>
  );
};

