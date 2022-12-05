import { Container } from "@chakra-ui/react";
import React from "react";
import { Header } from "../components/Header/Header";
import { InputForm } from "../components/inputForm/InputForm";
export default function Post() {
  return (
    <>
      <Header isLogin={false} />
      <Container maxW="3xl">
        <InputForm />
      </Container>
    </>
  );
}
