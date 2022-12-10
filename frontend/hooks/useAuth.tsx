import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { app } from "../firebase";
import { useSetRecoilState } from "recoil";
import { loginState } from "../store/Recoil";

export const useAuth = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const setLogin = useSetRecoilState(loginState);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const loginData = {
          isLogin: true,
          name: user.displayName ? user.displayName : "No User Name",
          photoURL: user.photoURL ? user.photoURL : "No Image",
          uid: user.uid,
        };

        setLogin(loginData);

        // ログイン情報の保存
        localStorage.setItem("loginStatus", JSON.stringify(loginData));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.error(errorCode, errorMessage);
      });
  };

  const logout = () => {
    signOut(auth);
    setLogin({
      isLogin: false,
      name: "Not Login",
      photoURL: "No Image",
      uid: "No UserName",
    });

    // ログイン情報の削除
    localStorage.removeItem("loginStatus");
  };

  return { login, logout };
};
