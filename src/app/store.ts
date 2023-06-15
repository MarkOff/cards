import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { appReducer } from "app/app.slice";
import { authReducer } from "features/auth/auth.slice";
import { packReducer } from "features/packs/packs.slice";
import { restoreState } from "localStorage/localStorage";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    pack: packReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend()
} );


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
