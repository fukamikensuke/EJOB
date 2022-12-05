import React from "react";
import { Header } from "../components/Header/Header";
import { Filter } from "../components/Filter/Filter";
import { Box, HStack } from "@chakra-ui/react";
import { CustomTable } from "../components/Table/CustomTable";
export default function Home() {
  return (
    <>
      <Header isLogin={false} />
      <HStack>
        <Box w="25%" alignSelf="flex-start">
          <Filter />
        </Box>
        <Box w="75%" alignSelf="flex-start">
          <CustomTable />
        </Box>
      </HStack>
    </>
  );
}
