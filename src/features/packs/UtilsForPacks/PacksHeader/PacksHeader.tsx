import React from "react";
import s from "./PacksHeader.module.css";
import { packThunks } from "features/packs/packs.slice";
import { useActions } from "common/hooks/useActions.ts";

export const PacksHeader = () => {
  const { addPack } = useActions(packThunks);

  const createPack = () => {
    const newPack = {
      name: "Vlad Pack"
    };
    addPack(newPack);
  };
  return (
    <div className={s.header}>
      <h1>Packs list</h1>
      <button onClick={createPack} className={s.addButton}>Add new pack</button>
    </div>
  );
};
