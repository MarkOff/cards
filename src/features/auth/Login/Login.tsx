import { authThunks } from "features/auth/auth.slice";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import s from "./Login.module.css";
import React, { useState } from "react";
import eye from "./../../../common/icons/eyeMain.svg";
import noEye from "./../../../common/icons/eyeNone.svg";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { toast } from "react-toastify";

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // const onSubmit = handleSubmit((data) => dispatch(authThunks.login(data)).unwrap().then(() => {
  //   navigate("/profile");
  // }));


  const onSubmit = handleSubmit((data) => {
    dispatch(authThunks.login(data))
      .unwrap()
      .then((res) => {
        toast.success("Вы успешно залогинились");
        navigate("/packs");
      })
      .catch((err) => {
        toast.error(err.e.responce.data.error)
      });
  });

  if (isLoggedIn) {
    return <Navigate to={"/profile"} />;
  }


  return (
    <>
      <form onSubmit={onSubmit} className={s.login}>
        <h1>Sign In</h1>
        <div className={s.mailContainer}>
          <input className={s.inputType} placeholder={"Enter you email"} type={"email"} {...register("email", {
            required: "Email field is empty"
          })} />
        </div>
        {/*{errors.email && <>{errors.email.message}</>}*/}
        <div className={s.passwordContainer}>
          <input className={s.inputType} placeholder={"Enter you password"}
                 type={showPassword ? "text" : "password"} {...register("password", { required: "Password field is empty" })} />
          <button className={s.buttonPassword} type="button" onClick={togglePasswordVisibility}>{showPassword ?
            <img src={noEye} alt="" /> :
            <img src={eye} alt="" />}</button>
        </div>
        {errors.email && <>{errors.email.message}</> || errors.password && <>{errors.password.message}</>}
        <label className={s.inputCheckboxContainer}>
          <input className={s.inputCheckbox} type={"checkbox"} {...register("rememberMe")} /> Remember me
        </label>
        <Link to={"/forgot-password"} className={s.forgotPassword}>Forgot Password?</Link>
        <button className={s.buttonSignIn} type={"submit"} onClick={onSubmit}>Sign In</button>
        <div className={s.dontHaveAccount}>Don't have an account?</div>
        <Link to={"/register"} className={s.signUp}> Sign up</Link>
      </form>
    </>
  );
};
