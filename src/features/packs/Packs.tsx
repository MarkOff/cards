import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packThunk } from "features/packs/packs.slice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import edit from "./../../common/icons/Edit.svg";
import clear from "./../../common/icons/Delete.svg";
import education from "./../../common/icons/teacher.svg";
import disableFilter from "./../../common/icons/clearFilter.svg";
import s from "./Packs.module.css";
import { NativeSelect, Pagination, Slider } from "@mui/material";
import { restoreState } from "localStorage/localStorage";
import { CardPacksType } from "features/packs/packs.api";
import FormControl from "@mui/material/FormControl";

export const Packs = () => {
  const packs = useAppSelector((state) => state.pack.packs.cardPacks);
  const allPages = useAppSelector((state) => state.pack.packs.cardPacksTotalCount);
  const id = useAppSelector(state => state.auth.profile._id);
  const [minValue, setMinValue] = useState(restoreState<number>("value1", 0));
  const [maxValue, setMaxValue] = useState(restoreState<number>("value2", 121));
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(5);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(packThunk.fetchPacks({ page, pageCount, min: minValue, max: maxValue }));
  }, [dispatch, page, pageCount]);


  const setCurrentPage = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const change = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinValue(value[0]);
      setMaxValue(value[1]);
    } else {
      setMinValue(value);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === "value1") {
      setMinValue(+event.currentTarget.value);
    } else {
      setMaxValue(+event.currentTarget.value);
    }
  };


  const addPack = () => {
    const newPack = {
      name: "Vlad Pack"
    };
    dispatch(packThunk.addPack(newPack));
  };

  const deletePack = (id: string) => {
    dispatch(packThunk.deletePack(id));
  };

  const updatePack = (pack: CardPacksType) => {
    const newName = "Markov Pack";
    dispatch(packThunk.updatePack({ ...pack, name: newName }));
  };


  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageCount(+e.currentTarget.value);
  };



  return (
    <div className={s.packsContainer}>
      <div className={s.header}>
        <h1>Packs list</h1>
        <button onClick={addPack} className={s.addButton}>Add new pack</button>
      </div>
      <div className={s.cardTool}>
        <div className={s.searchPacks}>
          Search
          <input className={s.inputPacks} type="text" placeholder={"Provide you text"} />
        </div>
        <div className={s.showPacks}>
          Show packs cards
          <div className={s.buttonShowPacks}>
            <button >My</button>
            <button>All</button>
          </div>
        </div>
        <div className={s.filterCount}>
          Number of cards
          <div className={s.countPosition}>
            <input type="number" value={minValue} onChange={handleInputChange} name={"value1"} />
            <Slider
              disableSwap
              max={121}
              value={[minValue, maxValue]}
              onChange={change}
              onChangeCommitted={() => {
                dispatch(packThunk.fetchPacks({ min: minValue, max: maxValue }));
              }}
            />
            <input type="number" value={maxValue} onChange={handleInputChange} name={"value2"} />
          </div>
        </div>
        <div className={s.disableFilter}>
          <img  src={disableFilter} alt="disable filter icon" />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell align="left"><b>Cards</b></TableCell>
              <TableCell align="left"><b>Last Update</b></TableCell>
              <TableCell align="left"><b>Created by</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs &&
              packs.map((p) => (
                <TableRow key={p._id}>
                  <TableCell component="th" scope="row">{p.name}</TableCell>
                  <TableCell align="left">{p.cardsCount}</TableCell>
                  <TableCell align="left">{p.updated}</TableCell>
                  <TableCell align="left">{p.user_name}</TableCell>
                  <TableCell align="center">
                    <div className={s.iconGroup}>
                      <img src={education} alt="education icon" />
                      {p.user_id === id &&
                        <img onClick={() => deletePack(p._id)} src={clear} alt="delete icon" />}
                      {p.user_id === "641f2b5e70681971570c5d82" &&
                        <img onClick={() => updatePack(p)} src={edit} alt="edit icon" />}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className={s.toolPagination}>
        <Pagination onChange={setCurrentPage} variant="text" color="primary"
                    count={Math.ceil(allPages / pageCount)}/>
        Show
        <FormControl className={s.selectedCount} size={"small"}>
          <NativeSelect
            defaultValue={5}
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
    </div>
  )
    ;
};

