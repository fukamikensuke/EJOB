import React from "react";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";
// FIXME: ファイル名の修正(大文字始まりのキャメルケースとする)
import { InternInfo } from "../../../components/internInfo/InternInfo";
import { Header } from "../../../components/Header/Header";
export default function DisplayInternInfo() {
  const router = useRouter();
  const { id } = router.query || "";

  return (
    <>
      <Header />
      <Container maxW="2xl">
        <InternInfo id={id} />
      </Container>
    </>
  );
}
