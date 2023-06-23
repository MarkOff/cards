import React from "react";
import s from "app/Header/Header.module.css";
import { useNavigate } from "react-router-dom";
import ava from "./../../common/icons/profileAvatar.jpg";
import { useAppSelector } from "common/hooks";
import { selectIsLogin, selectName } from "features/auth/auth.selector";

export const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLogin);
  const name = useAppSelector(selectName);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className={s.headerContainer}>
      {isLoggedIn ? (
        <div className={s.userInfo}>
          <span onClick={handleProfile} className={s.name}> {name} </span>
          <img onClick={handleProfile} className={s.ava} src={ava} alt="avatar" />
        </div>
      ) : (
        <button onClick={handleSignIn} className={s.button}>
          Sign in
        </button>
      )}
    </div>
  );
};

