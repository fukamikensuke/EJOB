import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../../store/Recoil";
// FIXME: ファイル名の先頭を大文字にする
import { InputForm } from "../../../../components/InputForm/InputForm";

export default function EditInternInfo() {
  const router = useRouter();
  const loginStatus = useRecoilValue(loginState);
  const { uid } = router.query;

  useEffect(() => {
    if (uid !== loginStatus.uid) {
      router.push("/error");
    } else {
      // internId に対応した情報を API から取得
    }
  }, [uid, loginStatus.uid, router]);

  return (
    <>
      {uid === loginStatus.uid && (
        <>
          <InputForm isEdit={true} />
        </>
      )}
    </>
  );
}
