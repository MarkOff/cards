import { authReducer, authThunks } from "features/auth/auth.slice";
import { ProfileType } from "features/auth/auth.api";

describe("authReducer", () => {
  const initialState: {
    profile: ProfileType;
    isLogin: boolean;
    successMessage: string;
    error: string | null;
  } = {
    profile: {
      _id: "",
      email: "",
      rememberMe: false,
      isAdmin: false,
      name: "",
      verified: false,
      publicCardPacksCount: 0,
      created: "",
      updated: "",
      __v: 0,
      token: "",
      tokenDeathTime: 0,
    },
    isLogin: false,
    successMessage: "",
    error: null,
  };

  it("should login work correctly and return profile", () => {
    const data = {
      email: "safrondev1@gmail.com",
      password: "1qazxcvBG",
      rememberMe: false,
    };

    const profile = {
      _id: "6435620aaf58963e887fb0f4",
      email: "safrondev1@gmail.com",
      rememberMe: false,
      isAdmin: false,
      name: "safrondev1@gmail.com",
      verified: false,
      publicCardPacksCount: 3,
      created: "2023-04-11T13:35:06.046Z",
      updated: "2023-05-05T06:35:21.310Z",
      __v: 0,
      token: "023f67e0-eb0f-11ed-b359-fbf835b5a380",
      tokenDeathTime: 1683279321310,
    };

    const action = authThunks.login.fulfilled({ profile }, "requestId", data);

    const state = authReducer(initialState, action);

    expect(state.profile).toEqual(profile);
  });
});