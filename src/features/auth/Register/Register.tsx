import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import s from "./Register.module.css";
import noEye from "./../../../common/icons/eyeNone.svg";
import Eye from "./../../../common/icons/eyeMain.svg";


export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = handleSubmit((data) => dispatch(authThunks.register(data)).unwrap().then(() => {
      navigate("/");
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
      <form onSubmit={onSubmit} className={s.register}>
        <h1>Sign Up</h1>
        <div className={s.mailContainer}>
        <input className={s.inputType} placeholder={"Enter your email"} type={"email"} {...register("email", {
          required: "This is required"
        })} />
        </div>
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
            validate: value => value === password || "Passwords do notmatch"
          })} />
          <button  className={s.buttonPassword} type="button" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <img src={noEye} alt="hide password" /> : <img src={Eye} alt="show password" />}
          </button>

        </div>
        {errors.confirmPassword && <>{errors.confirmPassword.message}</>}
        <button  className={s.buttonSingUp} type={"submit"} onClick={onSubmit}>Sign Up</button>
        <div className={s.dontHaveAccount}>Already have an account?</div>
        <Link to={"/login"} className={s.signUp}>Sign In</Link>
      </form>
    </>
  );
};

