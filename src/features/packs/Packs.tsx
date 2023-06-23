import React, { useEffect } from "react";
import { useAppSelector } from "common/hooks";
import { packThunks } from "features/packs/packs.slice";
import s from "./Packs.module.css";
import { useDebounce } from "common/hooks/useDebounce";
import { DataTable } from "features/packs/UtilsForPacks/DataTable/DataTable";
import { Paginator } from "common/paginator/Paginator";
import { Sliders } from "common/sliders/Sliders.";
import { PacksHeader } from "features/packs/UtilsForPacks/PacksHeader/PacksHeader";
import { SearchPack } from "features/packs/UtilsForPacks/SearchPack/SearchPack";
import { FilterAllOrMyPacks } from "features/packs/UtilsForPacks/FilterAllOrMyPacks/FilterAllOrMyPacks";
import { toast } from "react-toastify";
import {
  selectMax,
  selectMin,
  selectNamePack,
  selectPage,
  selectPageCount,
  selectSortPacks,
  selectUserId
} from "features/packs/packs.selector";
import { ClearAllFilters } from "features/packs/UtilsForPacks/ClearAllFilters/ClearAllFilters";
import { useActions } from "common/hooks/useActions.ts";

export const Packs = () => {

  const {fetchPacks} = useActions(packThunks)
  const minValue = useAppSelector(selectMin);
  const maxValue = useAppSelector(selectMax);
  const page = useAppSelector(selectPage);
  const pageCount = useAppSelector(selectPageCount);
  const namePack = useAppSelector(selectNamePack);
  const id = useAppSelector(selectUserId);
  const sortPacks = useAppSelector(selectSortPacks);
  const debounceMinValue = useDebounce(minValue, 250);
  const debounceMaxValue = useDebounce(maxValue, 250);
  const debounceNamePack = useDebounce(namePack, 250);

  useEffect(() => {
    fetchPacks({
      page,
      pageCount,
      min: minValue,
      max: maxValue,
      packName: namePack,
      user_id: id,
      sortPacks
    })
      .unwrap()
      .catch((err) => {
        toast.success(err.e.responce.data.error);
      })
    ;
  }, [page, pageCount, debounceNamePack, debounceMinValue, debounceMaxValue, id, sortPacks]);




  return (
    <div className={s.packsContainer}>
      <PacksHeader />
      <div className={s.cardTool}>
        <SearchPack />
        <FilterAllOrMyPacks />
        <Sliders />
        <ClearAllFilters/>
      </div>
      <DataTable />
      <Paginator />
    </div>
  )
    ;
};

