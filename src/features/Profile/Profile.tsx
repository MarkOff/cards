import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authThunks } from "features/auth/auth.slice";
import s from "./Profile.module.css";
import ava from "common/icons/profileAvatar.jpg";
import change from "common/icons/Edit.svg";
import { Logout } from "features/auth/Logout/Logout";
import { useAppDispatch, useAppSelector } from "common/hooks";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { name, email } = useAppSelector((state) => state.auth.profile);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: name
    }
  });

  useEffect(() => {
    setValue("name", name);
  }, [name, setValue]);

  const [inputName, setInputName] = useState(false);

  const changeName = () => {
    setInputName(!inputName);
  };

  const onSubmit = handleSubmit((data: any) => {
    dispatch(authThunks.changeProfile(data)).unwrap()
      .then(() => {
        setValue("name", data.name); // Обновляем значение поля формы
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
