import React from "react";
import { useRouter } from "next/router";
import { Text, Center } from "@chakra-ui/react";
import { UserTable } from "../../../components/Table/UserTable";
import { Header } from "../../../components/Header/Header";
import { VSpacer } from "../../../components/Spacer/Spacer";

export default function UserInfo() {
  const router = useRouter();
  const { id } = router.query || "";

  return (
    <>
      <Header />
      <Center>
        <Text fontSize="3xl">userid {id} さんの投稿したインターン情報</Text>
      </Center>
      <VSpacer size={10} />
      <UserTable />
    </>
  );
}
