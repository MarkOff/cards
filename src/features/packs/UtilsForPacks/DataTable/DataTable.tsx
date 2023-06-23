import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useAppSelector } from "common/hooks";
import { packActions, packThunks } from "features/packs/packs.slice";
import { CardPacksType } from "features/packs/packs.api";
import s from "features/packs/UtilsForPacks/DataTable/DataTable.module.css";
import sortDown from "./../../../../common/icons/sortDown.svg";
import sortUp from "./../../../../common/icons/sortUp.svg";
import { selectProfileId } from "features/auth/auth.selector";
import { selectCardPacks } from "features/packs/packs.selector";
import { useActions } from "common/hooks/useActions.ts";


export const DataTable = () => {
  const [sortOrder, setSortOrder] = useState("0");
  const [sortField, setSortField] = useState("updated");
  const packs = useAppSelector(selectCardPacks);
  const id = useAppSelector(selectProfileId);
  const { deletePack, updatePack } = useActions(packThunks);
  const { sortPacks } = useActions(packActions);

  const deletePackHandler = (id: string) => {
    deletePack(id);
  };

  const updatePackHandler = (pack: CardPacksType) => {
    const newName = "Markov Pack";
    updatePack({ ...pack, name: newName });
  };


  const config: ConfigType[] = [
    { name: "Name", field: "name", align: "left", isSortable: true },
    { name: "Cards", field: "cardsCount", align: "left", isSortable: true },
    { name: "Last Update", field: "updated", align: "center", isSortable: true },
    { name: "Created by", field: "user_name", align: "center", isSortable: true },
    { name: "Actions", field: "", align: "right", isSortable: false }
  ];


  const changeSortOrder = (order: string) => {
    sortPacks({ sortPacks: order + sortField });
    setSortOrder(order);
  };
  const changeSortField = (field: string) => {
    sortPacks({ sortPacks: sortOrder + field });
    setSortField(field);
  };

  const getSortArrow = (fieldName: string) => {
    if (fieldName === sortField) {
      return sortOrder === "0" ? <img className={s.sortUp} src={sortUp} alt="arrow sort up" /> :
        <img className={s.sortDown} src={sortDown} alt="arrow sort down" />;
    }
    return null;
  };


  return (
    <TableContainer component={Paper}>
      <Table aria-label="Table Data">
        <TableHead>
          <TableRow>
            {config.map((c: ConfigType) => (
              <TableCell key={c.name} align={c.align}>
                <b onClick={() => {
                  if (c.isSortable) {
                    changeSortField(c.field);
                    changeSortOrder(sortOrder === "0" ? "1" : "0");
                  }
                }}
                   className={s.sort}>{c.name} {c.isSortable && getSortArrow(c.field)}</b>

              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {packs &&
            packs.map((p) => (
              <TableRow key={p._id}>
                <TableCell align="left">{p.name}</TableCell>
                <TableCell align="left">{p.cardsCount}</TableCell>
                <TableCell align="left">{new Date(p.updated).toLocaleDateString()}</TableCell>
                <TableCell align="left">{p.user_name}</TableCell>
                <TableCell align="left">
                  <div className={s.iconGroup}>
                    {p.cardsCount > 0 && <button className={s.educationButton}></button>}
                    {p.user_id === id &&
                      <button onClick={() => deletePackHandler(p._id)} className={s.deleteButton}></button>}
                    {p.user_id === id &&
                      <button onClick={() => updatePackHandler(p)} className={s.updateButton}></button>}
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};


type ConfigType = {
  name: string
  field: string
  align: AlignType
  isSortable: boolean
}

type AlignType = "left" | "center" | "right" | "justify" | "inherit" | undefined