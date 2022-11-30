import { Link, Stack, HStack } from "@chakra-ui/react";
import React from "react";

import { ComponentSample } from "../components/ComponentSample";

export default function Home() {
  console.log("temp");
  return (
    <>
      <ComponentSample />
      <Stack>
        <Link href="/about">about!!!!!!!</Link>
        <Link href="/user/1">user 1</Link>
        <Link href="/user/2">user 2</Link>
        <Link href="/user/3">user 3</Link>
      </Stack>
    </>
  );
}
