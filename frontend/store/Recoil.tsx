import { atom } from "recoil";

export const loginState = atom({
  key: "login",
  // TODO: default に型を定義して、string 系の初期値を null にする
  default: {
    isLogin: false,
    name: "Not Login",
    photoURL: "No Image",
    uid: "No UserName",
  },
});
