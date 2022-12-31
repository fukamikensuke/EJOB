import React from "react";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";
import { InternInfo } from "../../../components/InternInfo/InternInfo";
export default function DisplayInternInfo() {
  const router = useRouter();
  const { id } = router.query || "";

  return (
    <>
      <Container maxW="2xl">
        <InternInfo id={id} />
      </Container>
    </>
  );
}
