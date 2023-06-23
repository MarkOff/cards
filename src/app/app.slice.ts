import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "features/auth/auth.api";
import { authActions } from "features/auth/auth.slice";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { AxiosError, isAxiosError } from "axios";


const appInitialState = {
  error: null as string | null,
  isLoading: false,
  isAppInitialized: false,
  users: [],
  isInitialize: false
};

export const isInitializeApp = createAppAsyncThunk
("auth/isInitialize", async (_, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.me();
    if (res.data) {
      thunkAPI.dispatch(authActions.setProfile(res.data));
      return res.data;
    }
  });
});

export type InitialAppStateType = typeof appInitialState

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(appThunks.isInitializeApp.fulfilled, (state) => {
        state.isInitialize = true;
      })
      .addCase(appThunks.isInitializeApp.rejected, (state) => {
        state.isInitialize = true;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
            state.isLoading = false;
          if (action.type !== "auth/isInitialize/rejected") {
            if (!action.payload.showGlobalError) return;
            const err = action.payload.e as Error | AxiosError<{ error: string }>;
            if (isAxiosError(err)) {
              state.error = err.response ? err.response.data.error : err.message;
            } else {
              state.error = `Native error ${err.message}`;
            }
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      );
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { isInitializeApp };
