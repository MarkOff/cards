import React from "react";
import s from "app/Header/Header.module.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const onSubmit = () => navigate("/login")

  return (
    <div className={s.headerContainer}>
      <button onClick={onSubmit} className={s.button}>Sign in</button>
    </div>
  );
};

