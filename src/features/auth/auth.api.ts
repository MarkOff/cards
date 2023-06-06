import { instance } from "common/api/common.api";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg);
  },
  me: () => {
    return instance.post<ProfileType>("auth/me");
  },
  changeProfile: (arg: ArgChangeProfile) => {
    return instance.put<ResponseChangeProfile>("auth/me", arg);
  },
  logout: () => {
    return instance.delete<ResponseType>("auth/me");
  },
  forgot: (arg: ArgForgotType) => {
    return instance.post<ResponseType>("auth/forgot", {
      ...arg,
      from: "test-front-admin <ai73a@yandex.by>",
      message: `<div style="background-color: white; padding: 15px">password recovery link: <a href="http://localhost:3000/set-new-password/$token$">link</a></div>`
    });
  },
  setNewPassword: (arg: ArgSetNewPasswordType) => {
    return instance.post<ResponseType>("auth/set-new-password", arg);
  }
};

// Types

export type ArgLoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ArgChangeProfile = {
  name: string
  avatar?: string
}

export type ArgForgotType = {
  email: string
  // from: string
  // message: string
}

export type ArgSetNewPasswordType = {
  password: string
  resetPasswordToken: string
}

export type ResponseChangeProfile = {
  updatedUser: ProfileType

  error?: string
}

export type ResponseType = {
  info: string
  error: string
}

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">


export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">
}



export type ProfileType = {
  _id: string
  email: string
  name: string
  publicCardPacksCount: number
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  __v: number
  token: string
  tokenDeathTime: number
}