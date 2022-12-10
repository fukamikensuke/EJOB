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
        if (user.displayName) {
          setLogin({
            isLogin: true,
            name: user.displayName,
          });
        } else {
          setLogin({
            isLogin: true,
            name: "No User Name",
          });
        }
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
    });
  };

  return { login, logout };
};
