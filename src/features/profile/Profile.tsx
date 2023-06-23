import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authThunks } from "features/auth/auth.slice";
import s from "./Profile.module.css";
import ava from "common/icons/profileAvatar.jpg";
import change from "common/icons/Edit.svg";
import { Logout } from "features/auth/UtilsForAuth/Logout/Logout";
import { useAppSelector } from "common/hooks";
import { selectEmail, selectName } from "features/auth/auth.selector";
import { ArgChangeProfile } from "features/auth/auth.api";
import { useActions } from "common/hooks/useActions.ts";

export const Profile = () => {
  const { changeProfile } = useActions(authThunks);
  const email = useAppSelector(selectEmail);
  const name = useAppSelector(selectName);
  const [inputName, setInputName] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: name
    }
  });

  useEffect(() => {
    setValue("name", name);
  }, [name, setValue]);


  const changeName = () => {
    setInputName(!inputName);
  };

  const onSubmit = handleSubmit((data: ArgChangeProfile) => {
    changeProfile(data).unwrap()
      .then(() => {
        setValue("name", data.name);
        setInputName(false);
      });
  });

  return (
    <>
      <form onSubmit={onSubmit} className={s.profile}>
        <h1>Personal information</h1>
        <div>
          <img className={s.avatar} src={ava} alt="profile avatar" />
        </div>
        <div>
          {inputName ?
            <div>
              <input type="text"{...register("name")} defaultValue={name} />
              <button onClick={onSubmit}>Save</button>
            </div>
            : <div>
              {name} <img onClick={changeName} src={change} alt="change profile icon" />
            </div>
          }

        </div>
        <div>{email}</div>
        <div>
          <Logout />
        </div>
      </form>
    </>
  );
};
