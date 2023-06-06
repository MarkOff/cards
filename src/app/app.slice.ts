import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { authApi } from "features/auth/auth.api";
import { isAxiosError } from "axios";
import { authThunks, setProfile } from "features/auth/auth.slice";


const appInitialState = {
  error: null as string | null,
  isLoading: true,
  isAppInitialized: false,
  users: [],
  isInitialize: false
};

export const isInitializeApp = createAppAsyncThunk
("auth/isInitialize", async (_, thunkAPI) => {
  const { dispatch } = thunkAPI;
  const res = await authApi.me();
  if (res.data) {
    dispatch(setProfile(res.data));
    return res.data;
  }
});

type InitialStateType = typeof appInitialState

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(appThunks.isInitializeApp.fulfilled, (state, action) => {
      state.isInitialize = true;
      state.isLoading = false;
    });
    builder.addCase(appThunks.isInitializeApp.rejected, (state, action) => {
      state.isInitialize = true;
      state.isLoading = false;
    });
    // builder.addCase(authThunks.register.rejected, (state, action) => {
    //   if (!isAxiosError(action.payload)) {
    //     state.error = "an error";
    //
    //     return;
    //   }
    // });
  }
});

export const appReducer = slice.reducer;
// export const appActions = slice.actions;
export const appThunks = { isInitializeApp };
