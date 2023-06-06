import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import s from "./CheckEmail.module.css";
import emailIcon from "common/icons/loon-icon.svg";

export const CheckEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const onSubmit = ()  => {
    navigate("/login")
  }

  return (
    <>
      <div className={s.checkEmail}>
        <h1>Check Email</h1>
        <img className={s.iconEmail} src={emailIcon} alt="icon-email" />
        <button className={s.buttonSendInstruction} type={"submit"} onClick={onSubmit} >Back to login</button>
        <div className={s.instructionText}>We've sent an Email with instruction to {email} </div>
      </div>
    </>
  );
};

