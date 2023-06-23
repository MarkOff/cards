import React, { ChangeEvent } from "react";
import { NativeSelect, Pagination } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import s from "./Paginatro.module.css";
import { useAppSelector } from "common/hooks";
import { packActions } from "features/packs/packs.slice";
import { selectAllPacks, selectPage, selectPageCount } from "features/packs/packs.selector";
import { useActions } from "common/hooks/useActions.ts";

export const Paginator = () => {
  const { setPageCount, setPage } = useActions(packActions);
  const allPages = useAppSelector(selectAllPacks);
  const pageCount = useAppSelector(selectPageCount);
  const page = useAppSelector(selectPage);


  const setCurrentPage = (e: ChangeEvent<unknown>, value: number) => {
    setPage({ page: value });
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageCount({ pageCount: +e.currentTarget.value });
  };


  return (
    <div className={s.toolPagination}>
      <Pagination onChange={setCurrentPage} variant="text" color="primary"
                  page={page}
                  count={Math.ceil(allPages / pageCount)} />
      Show
      <FormControl className={s.selectedCount} size={"small"}>
        <NativeSelect
          value={pageCount}
          onChange={handleChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </NativeSelect>
      </FormControl>
      Cards per Page
    </div>
  );
};

