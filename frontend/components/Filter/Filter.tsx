import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { CustomAccordionItem } from "./CustomAccordionItem";
import axios from "axios";

type Props = {
  selectedFilterData: (number | null)[];
  setSelectedFilterData: Dispatch<SetStateAction<(number | null)[]>>;
  isPostFilter: boolean;
  setIsPostFilter: Dispatch<SetStateAction<boolean>>;
};
export const Filter = ({
  selectedFilterData,
  setSelectedFilterData,
  isPostFilter,
  setIsPostFilter,
}: Props) => {
  const [filterDataAPI, setFilterDataAPI] = useState({ data: [] });
  const [isSearchDisable, setIsSearchDisable] = useState<boolean>(true);
  // const [selectedFilterData, setSelectedFilterData] = useState<
  //   (number | null)[]
  // >([null, null, null, null, null]);

  // API からデータの取得
  useEffect(() => {
    const url = "http://localhost:8000/search-status";
    axios
      .get(url)
      .then((res) => {
        setFilterDataAPI(res.data);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("api error /search-status");
      });
  }, []);

  useEffect(() => {
    // TODO: storybook で undefined を避けるため
    if (selectedFilterData) {
      setIsSearchDisable(selectedFilterData.every((x) => x === null));
    }
  }, [selectedFilterData]);

  const handleClick = () => {
    // TODO: この実装をもう少しいい感じする
    setIsPostFilter(!isPostFilter);
  };

  return (
    <>
      <VStack>
        <Accordion allowMultiple w="100%">
          {/* XXX: Array であることは保証されているはずなのに…  */}
          {filterDataAPI.data.map(
            (
              data: {
                displayName: string;
                data: { id: number; text: string }[];
              },
              index: number
            ) => {
              if (index < 3) {
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
                        newArray[4] = event.target.value as unknown as number;
                      }
                      setSelectedFilterData(newArray);
                    }}
                  />
                  <Text w="30%">円以上</Text>
                </HStack>
              </Center>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <VSpacer size={2} />
        <Center>
          <Button
            colorScheme="blue"
            isDisabled={isSearchDisable}
            onClick={handleClick}
          >
            検索
          </Button>
        </Center>
        <VSpacer size={4} />
      </VStack>
    </>
  );
};
