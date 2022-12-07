import React from "react";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";
import { InternInfo } from "../../../components/InternInfo/InternInfo";
import { Header } from "../../../components/Header/Header";
export default function DisplayInternInfo() {
  const router = useRouter();
  const { id } = router.query || "";

  return (
    <>
      <Header />
      <Container maxW="2xl">
        <p>id {id} に関するインターン情報</p>
        <InternInfo />
      </Container>
    </>
  );
}
