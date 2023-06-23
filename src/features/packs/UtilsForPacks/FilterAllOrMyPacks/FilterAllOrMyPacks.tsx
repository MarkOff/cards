import React from "react";
import s from "./FilterAllOrMyPacks.module.css";
import { packActions } from "features/packs/packs.slice";
import { useAppSelector } from "common/hooks";
import { selectProfileId } from "features/auth/auth.selector";
import { selectUserId } from "features/packs/packs.selector";
import { useActions } from "common/hooks/useActions.ts";

export const FilterAllOrMyPacks = () => {
  const { setMyOrAllPacks } = useActions(packActions);
  const profileId = useAppSelector(selectProfileId);
  const id = useAppSelector(selectUserId);
  const onChangeMyPack = () => {
    setMyOrAllPacks({ user_id: profileId });
  };
  const onChangeAllPack = () => {
    setMyOrAllPacks({ user_id: "" });
  };

  return (
    <div className={s.showPacks}>
      Show packs cards
      <div className={s.buttonShowPacks}>
        <button
          className={profileId === id ? s.activeButton : s.defaultButton}
          onClick={onChangeMyPack}
        >
          My
        </button>
        <button
          className={profileId !== id ? s.activeButton : s.defaultButton}
          onClick={onChangeAllPack}
        >
          All
        </button>
      </div>
    </div>
  );
};