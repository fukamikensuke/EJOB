import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { Text, Center } from "@chakra-ui/react";
import { loginState } from "../../../store/Recoil";
import { UserTable } from "../../../components/Table/UserTable";
import { Header } from "../../../components/Header/Header";
import { VSpacer } from "../../../components/Spacer/Spacer";

export default function UserInfo() {
  const router = useRouter();
  const loginStatus = useRecoilValue(loginState);
  const { id } = router.query || "";

  useEffect(() => {
    if (id !== loginStatus.uid) {
      router.push("/error");
    }
  }, [id, loginStatus.uid, router]);

  return (
    <>
      {id === loginStatus.uid && (
        <>
          <Header />
          <Center>
            <Text fontSize="3xl">
              {loginStatus.name} さんの投稿したインターン情報
            </Text>
          </Center>
          <VSpacer size={10} />
          <UserTable />{" "}
        </>
      )}
    </>
  );
}
