import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authThunks } from "features/auth/auth.slice";
import s from 'features/auth/UtilsForAuth/RecoveryPassword/CreateNewPassword/CreateNewPassword.module.css'
import noEye from "common/icons/eyeNone.svg";
import Eye from "common/icons/eyeMain.svg";
import { useActions } from "common/hooks/useActions.ts";

export const CreateNewPassword = () => {
  const {setNewPassword} = useActions(authThunks);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {token} = useParams()
  const { register, handleSubmit, watch ,formState: { errors } } = useForm<{password: string, confirmPassword: string}>
  ({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = handleSubmit((data) =>
    setNewPassword({password: data.password, resetPasswordToken: token!})
    .unwrap()
    .then(() => {
      navigate("/login");
    }
  ));

  const password = watch("password");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };



  return (
    <>
      <form onSubmit={onSubmit} className={s.newPassword}>
        <h1>Create new password</h1>

        <div className={s.passwordContainer}>
          <input className={s.inputType} placeholder={"Create password"}
                 type={showPassword ? "text" : "password"} {...register("password", { required: "This is required" })} />
          <button className={s.buttonPassword} type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <img src={noEye} alt="hide password" /> : <img src={Eye} alt="show password"/>}
          </button>
        </div>
        <div className={s.passwordContainer}>
          <input className={s.inputType} placeholder={"Confirm password"}
                 type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword", {
            required: "This is required",
            validate: value => value === password || "Passwords do not match"
          })} />
          <button  className={s.buttonPassword} type="button" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <img src={noEye} alt="hide password" /> : <img src={Eye} alt="show password" />}
          </button>

        </div>
        {errors.confirmPassword && <>{errors.confirmPassword.message}</>}
        <button  className={s.buttonCreateNewPassword} type={"submit"} onClick={onSubmit}>Create new password</button>
        <div className={s.alreadyAccount}>Create new password and we will send you further instruction to email</div>
      </form>
    </>
  );
};



