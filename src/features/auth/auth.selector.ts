import { RootState } from "app/store";

export const selectProfile = (state: RootState) => state.auth.profile
export const selectName = (state: RootState) => state.auth.profile.name
export const selectEmail = (state: RootState) => state.auth.profile.email
export const selectError = (state: RootState) => state.auth.error
export const selectIsLogin = (state: RootState) => state.auth.isLogin
export const selectSuccessMessage = (state: RootState) => state.auth.successMessage
export const selectProfileId = (state: RootState) => state.auth.profile._id
