import { atom } from "recoil";

export const loginState = atom({
  key: "login",
  default: {
    isLogin: false,
    name: "Not Login",
  },
});
