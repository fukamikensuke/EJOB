import React, { Dispatch, SetStateAction } from "react";

import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Center,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";

type Props = {
  selectedFilterData: (number | null)[];
  setSelectedFilterData: Dispatch<SetStateAction<(number | null)[]>>;
};

export const Salary = ({
  selectedFilterData,
  setSelectedFilterData,
}: Props) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="center">
          給与
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel p={4}>
        <Center>
          <HStack w="100%">
            <Text w="20%">時給</Text>
            <Input
              w="50%"
              type="number"
              placeholder="時給"
              onChange={(event) => {
                let newArray = [...selectedFilterData];
                if (event.target.value === "") {
                  newArray[4] = null;
                } else {
                  newArray[4] = Number(event.target.value);
                }
                setSelectedFilterData(newArray);
              }}
            />
            <Text w="30%">円以上</Text>
          </HStack>
        </Center>
      </AccordionPanel>
    </AccordionItem>
  );
};
