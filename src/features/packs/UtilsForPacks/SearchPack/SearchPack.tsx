import React, { ChangeEvent, useMemo } from "react";
import s from "./SearchPack.module.css";
import { useAppSelector } from "common/hooks";
import { packActions } from "features/packs/packs.slice";
import { selectCardPacks, selectNamePack } from "features/packs/packs.selector";
import { useActions } from "common/hooks/useActions.ts";

export const SearchPack = () => {
  const {setSearchPackName} = useActions(packActions)
  const namePack = useAppSelector(selectNamePack);
  const packs = useAppSelector(selectCardPacks);

  const notFound = useMemo(() => {
    return packs?.filter(pack => pack.name.indexOf(namePack) > -1);
  }, [packs, namePack]);

  const onChangeHandelFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPackName({ packName: e.currentTarget.value });
  };

  return (
    <div className={s.searchPacks}>
      Search
      <input
        value={namePack}
        onChange={onChangeHandelFilter}
        className={s.inputPacks}
        type="text"
        placeholder={"Provide you text"}
      />
      {notFound?.length === 0 && <p>Not found</p>}
    </div>
  );
};