import React, { useEffect, useState } from "react";
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
  const [selectedFilterData, setSelectedFilterData] = useState<
    (number | null)[]
  >([null, null, null, null, null]);

  useEffect(() => {
    setIsSearchDisable(selectedFilterData.every((x) => x === null));
  }, [selectedFilterData]);

  // TODO: filterData を API で取得 (GET search-status/)
  // TODO: ボタン選択時に postFilterData を送信する

  return (
    <>
      <VStack>
        <Accordion allowMultiple>
          {/* XXX: Array であることは保証されているはずなのに…  */}
          {filterData.data.map(
            (
              data: { id: string; data: { id: number; text: string }[] },
              index: number
            ) => {
              if (index <= 3) {
                return (
                  <CustomAccordionItem
                    key={index}
                    index={index}
                    item={data}
                    selectedData={selectedFilterData}
                    setState={setSelectedFilterData}
                  />
                );
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
                    <Input
                      type="number"
                      placeholder="時給"
                      onChange={(event) => {
                        let newArray = [...selectedFilterData];
                        if (event.target.value === "") {
                          newArray[4] = null;
                        } else {
                          newArray[4] = event.target.value as unknown as number;
                        }
                        setSelectedFilterData(newArray);
                      }}
                    />
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
    </>
  );
};
