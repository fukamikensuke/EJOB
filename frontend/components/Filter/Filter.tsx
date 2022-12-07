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
import { filterData } from "../../store/dummyData";
import { CustomAccordionItem } from "./CustomAccordionItem";

export const Filter = () => {
  const [isSearchDisable, setIsSearchDisable] = useState<boolean>(true);

  // TODO: filterData を API で取得 (GET search-status/)
  // TODO: ボタン選択時に postFilterData を送信する

  return (
    <VStack>
      <Accordion allowMultiple>
        {/* XXX: Array であることは保証されているはずなのに…  */}
        {filterData.data.map(
          (
            data: { id: string; data: { id: number; text: string }[] },
            index: number
          ) => {
            if (index <= 3) {
              return <CustomAccordionItem key={index} id={index} item={data} />;
            }
          }
        )}
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
