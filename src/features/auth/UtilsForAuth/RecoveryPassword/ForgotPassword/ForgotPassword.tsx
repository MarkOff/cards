import React from "react";
import s from "features/auth/UtilsForAuth/RecoveryPassword/ForgotPassword/ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authThunks } from "features/auth/auth.slice";
import { ArgForgotType } from "features/auth/auth.api";
import { useActions } from "common/hooks/useActions.ts";

export const ForgotPassword = () => {
  const { forgotPassword } = useActions(authThunks);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ArgForgotType>({
    defaultValues: {
      email: ""
    }
  });


  const onSubmit = handleSubmit((data) => forgotPassword(data)
    .unwrap()
    .then(() => {
      navigate(`/check-email?email=${data.email}`);
    }
  ));

  return (
    <>
      <form onSubmit={onSubmit} className={s.forgotPassword}>
        <h1>Forgot you password?</h1>
        <input className={s.inputType} placeholder={"Enter you email"} type={"email"} {...register("email", {
          required: "Email field is empty"
        })} />
        <div className={s.helpText}>Enter you email address ane we will send you further instructions</div>
        {errors.email && <div>{errors.email.message}</div>}

        <button className={s.buttonSendInstruction} type={"submit"} onClick={onSubmit}>Send instruction</button>
        <div className={s.rememberAccount}>Did you remember your password?</div>
        <Link to={"/login"} className={s.tryLogin}> Try to logging in </Link>
      </form>
    </>
  );
};

