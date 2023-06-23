import { RootState } from "app/store";

export const selectIsLoading = (state: RootState) => state.app.isLoading
export const selectError = (state: RootState) => state.app.error
export const selectIsAppInitialized = (state: RootState) => state.app.isAppInitialized
export const selectUsers = (state: RootState) => state.app.users
export const selectIsInitialize = (state: RootState) => state.app.isInitialize