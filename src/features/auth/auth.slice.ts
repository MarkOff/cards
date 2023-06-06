import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgChangeProfile,
  ArgForgotType,
  ArgLoginType,
  ArgRegisterType,
  ArgSetNewPasswordType,
  authApi,
  ProfileType
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { appThunks } from "app/app.slice";
import { isAxiosError } from "axios";


const slice = createSlice({
  name: "auth",
  initialState: {
    profile: {
      name: "",
      email: ""
    } as ProfileType,
    isLogin: false,
    error: null as null | string
  },
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload;
      state.isLogin = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.isLogin = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      if (!isAxiosError(action.payload)) {
        state.error = "an error";
        return;
      }
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false;
    });
    builder.addCase(appThunks.isInitializeApp.fulfilled, (state, action) => {
      state.isLogin = true;
    });
    builder.addCase(changeProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  }
});

const register = createAppAsyncThunk<void, ArgRegisterType>
("auth/register", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await authApi.register(arg);
    console.log(res);
  } catch (e) {
    console.log('Register error');
    // return rejectWithValue(e);
  }
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", async (arg) => {
  const res = await authApi.login(arg);
  return { profile: res.data };
});

const logout = createAppAsyncThunk
("auth/logout", async () => {
  await authApi.logout();
});

const forgotPassword = createAppAsyncThunk
("auth/forgot-password", async (arg: ArgForgotType, thunkAPI) => {
  await authApi.forgot(arg);
});

const setNewPassword = createAppAsyncThunk
("auth/set-new-password", async (arg: ArgSetNewPasswordType) => {
  await authApi.setNewPassword(arg);
});

const changeProfile = createAppAsyncThunk
("auth/change-profile", async (arg: ArgChangeProfile) => {
  const res = await authApi.changeProfile(arg);
  return res.data.updatedUser;
});

export const { setProfile } = slice.actions;
export const authReducer = slice.reducer;
export const authThunks = { register, login, logout, forgotPassword, setNewPassword, changeProfile };
