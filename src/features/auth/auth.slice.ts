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
import { appThunks } from "app/app.slice";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";


const slice = createSlice({
  name: "auth",
  initialState: {
    profile: {
      name: "",
      email: "",
      _id: ''
    } as ProfileType,
    isLogin: false,
    successMessage: "",
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
      state.successMessage = "Вы успешно залогинились!";
      state.isLogin = true;
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
("auth/register", async (arg: ArgRegisterType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg);
  });
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.login(arg);
      return { profile: res.data };
    },
    true
  );
});

const logout = createAppAsyncThunk
("auth/logout", async (_, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.logout();
  });
});

const forgotPassword = createAppAsyncThunk
("auth/forgot-password", async (arg: ArgForgotType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.forgot(arg);
  });
});

const setNewPassword = createAppAsyncThunk
("auth/set-new-password", async (arg: ArgSetNewPasswordType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.setNewPassword(arg);
  });
});

const changeProfile = createAppAsyncThunk
("auth/change-profile", async (arg: ArgChangeProfile, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.changeProfile(arg);
    return res.data.updatedUser;
  });
});

export const { setProfile } = slice.actions;
export const authReducer = slice.reducer;
export const authThunks = { register, login, logout, forgotPassword, setNewPassword, changeProfile };
