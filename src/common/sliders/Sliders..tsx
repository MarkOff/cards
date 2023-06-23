import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packActions } from "features/packs/packs.slice";
import s from "./Slider.module.css";
import { selectMax, selectMin } from "features/packs/packs.selector";
import { useActions } from "common/hooks/useActions.ts";

export const Sliders = () => {
  const dispatch = useAppDispatch();
  const { setMinValue, setMaxValue } = useActions(packActions);
  const minValue = useAppSelector(selectMin);
  const maxValue = useAppSelector(selectMax);
  const [value, setValue] = useState<number[]>([minValue, maxValue]);

  useEffect(() => {
    setValue([minValue, maxValue]);
  }, [minValue, maxValue]);

  const onChangeSlider = (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue(value);
    }
  };


  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === "value1") {
      setValue([+event.currentTarget.value, maxValue]);
      setMinValue({ min: +event.currentTarget.value });
    } else {
      setValue([minValue, +event.currentTarget.value]);
      setMaxValue({ max: +event.currentTarget.value });
    }
  };


  return (
    <div className={s.filterCount}>
      Number of cards
      <div className={s.countPosition}>
        <input type="number" value={value[0]} onChange={onChangeInput} name={"value1"} />
        <Slider
          disableSwap
          max={121}
          value={value}
          onChange={onChangeSlider}
          onChangeCommitted={(event, value) => {
            if (Array.isArray(value)) {
              dispatch(setMinValue({ min: value[0] }));
              dispatch(setMaxValue({ max: value[1] }));
            } else {
              dispatch(setMinValue({ min: value }));
            }
          }
          }
        />
        <input type="number" value={value[1]} onChange={onChangeInput} name={"value2"} />
      </div>
    </div>
  );
};

