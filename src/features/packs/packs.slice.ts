import { createSlice } from "@reduxjs/toolkit";
import { AddPackArgType, CardPacksType, packsApi, PacksArgType, PacksType } from "features/packs/packs.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";

const slice = createSlice({
  name: "pack",
  initialState: {
    packs: {} as PacksType,
    // page: 1,
    // pageCount: 4,
    // cardPacksTotalCount: 2000,
    // minCardsCount: 0,
    // maxCardsCount: 100
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
      state.packs = action.payload;
      // state.page = action.payload.page;
      // state.pageCount = action.payload.pageCount;
      // state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
      // state.minCardsCount = action.payload.minCardsCount;
      // state.maxCardsCount = action.payload.maxCardsCount;
    });
  },
});

const fetchPacks = createAppAsyncThunk<PacksType, PacksArgType>("packs/fetchPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(arg);
    return res;
  });
});

const addPack = createAppAsyncThunk<void, AddPackArgType>("packs/addPack", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.addPack(arg);
    dispatch(fetchPacks({}));
  });
});

const deletePack = createAppAsyncThunk<void, string>("packs/deletePack", async (id, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.deletePack(id);
    dispatch(fetchPacks({}));
  });
});

const updatePack = createAppAsyncThunk<void, CardPacksType>("packs/deletePack", async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.updatePack(arg);
    dispatch(fetchPacks({}));
  });
});

export const packReducer = slice.reducer;

export const packThunk = { fetchPacks, addPack, deletePack, updatePack };
export const {} = slice.actions;
