import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Center,
  VStack,
  HStack,
  InputGroup,
  Input,
  Text,
} from "@chakra-ui/react";
import { VSpacer } from "../Spacer/Spacer";
import { CheckboxItem } from "./CheckboxItem";
import { filterData } from "../../store/dummyData";

// TODO: refactor もっといい感じに書けそう
export const Filter = () => {
  const [isSearchDisable, setIsSearchDisable] = useState<boolean>(true);

  return (
    <VStack>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              総合評価
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={4}>
            <CheckboxItem props={filterData.data.evaluation} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              職種
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={4}>
            <CheckboxItem props={filterData.data.jobType} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              インターン種別
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={4}>
            <CheckboxItem props={filterData.data.internType} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              期間
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={4}>
            <CheckboxItem props={filterData.data.period} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              報酬
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={4}>
            <Center>
              <HStack>
                <Text>時給</Text>
                <InputGroup w={36}>
                  <Input type="number" placeholder="時給" />
                </InputGroup>
                <Text>円以上</Text>
              </HStack>
            </Center>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <VSpacer size={2} />
      <Center>
        <Button colorScheme="blue" isDisabled={isSearchDisable}>
          検索
        </Button>
      </Center>
      <VSpacer size={4} />
    </VStack>
  );
};
