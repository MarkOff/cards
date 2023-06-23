import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddPackArgType,
  CardPacksType,
  packsApi,
  PacksArgType,
  PacksType,
  SearchParamsType
} from "features/packs/packs.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";

const slice = createSlice({
  name: "pack",
  initialState: {
    packs: {} as PacksType,
    searchParams: {
      min: 0,
      max: 121,
      page: 1,
      pageCount: 5,
      packName: "",
      user_id: "",
      sortPacks: "0updated"
    } as SearchParamsType,
  },
  reducers: {
    setMinValue: (state, action: PayloadAction<{ min: number }>) => {
      state.searchParams.min = action.payload.min;
    },
    setMaxValue: (state, action: PayloadAction<{ max: number }>) => {
      state.searchParams.max = action.payload.max;
    },
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.searchParams.page = action.payload.page;
    },
    setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
      state.searchParams.pageCount = action.payload.pageCount;
    },
    setSearchPackName: (state, action: PayloadAction<{ packName: string }>) => {
      state.searchParams.packName = action.payload.packName;
    },
    setMyOrAllPacks: (state, action: PayloadAction<{ user_id: string }>) => {
      state.searchParams.user_id = action.payload.user_id;
    },
    setClearAllFilters: (state, action: PayloadAction<SearchParamsType>) => {
      state.searchParams = action.payload;
    },
    sortPacks: (state, action: PayloadAction<{ sortPacks: string }>) => {
      state.searchParams.sortPacks = action.payload.sortPacks;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPacks.fulfilled, (state, action) => {
        state.packs = action.payload;
      })
      .addCase(addPack.fulfilled, (state, action) => {
        state.packs.cardPacks.unshift(action.payload.pack);
      })
      .addCase(deletePack.fulfilled, (state, action) => {
        const index = state.packs.cardPacks.findIndex((p) => p._id === action.payload.packId);
        if(index !== -1) state.packs.cardPacks.slice(index, 1)
      });
  }
});

const fetchPacks = createAppAsyncThunk<PacksType, PacksArgType>("packs/fetchPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    return await packsApi.getPacks(arg);
  });
});

const addPack = createAppAsyncThunk<{ pack: CardPacksType }, AddPackArgType>(
  "packs/addPack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.addPack(arg);
      dispatch(fetchPacks({}));
    });
  });

const deletePack = createAppAsyncThunk<{ packId: string }, string>("packs/deletePack", async (id, thunkAPI) => {
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

export const packThunks = { fetchPacks, addPack, deletePack, updatePack };
export const packActions = slice.actions;
