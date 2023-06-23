import React from "react";
import { packActions } from "features/packs/packs.slice";
import s from "./ClearAllFilters.module.css";
import { useActions } from "common/hooks/useActions.ts";

export const ClearAllFilters = () => {
  const { setClearAllFilters } = useActions(packActions);

  const clearAllFilters = () => {
    setClearAllFilters({
      min: 0,
      max: 121,
      packName: "",
      page: 1,
      pageCount: 5,
      user_id: "",
      sortPacks: "0updated"
    });
  };

  return (
    <>
      <button onClick={clearAllFilters} className={s.disableFilter}></button>
    </>
  );
};

