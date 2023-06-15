import React from "react";
import s from "app/Header/Header.module.css";
import { useNavigate } from "react-router-dom";
import ava from "./../../common/icons/profileAvatar.jpg";
import { useAppSelector } from "common/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLogin);
  const  name  = useAppSelector((state) => state.auth.profile.name);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className={s.headerContainer}>
      {isLoggedIn ? (
        <div  className={s.userInfo}>
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

