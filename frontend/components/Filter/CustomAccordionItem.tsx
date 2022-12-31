import React, { Dispatch, SetStateAction } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { CheckboxItem } from "./CheckboxItem";

type Props = {
  index: number;
  item: {
    displayName: string;
    data: { id: number; text: string }[];
  };
  selectedData: (number | null)[];
  setState: Dispatch<SetStateAction<(number | null)[]>>;
};

export const CustomAccordionItem = ({
  index,
  item,
  selectedData,
  setState,
}: Props) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="center">
          {item.displayName}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel p={4}>
        <CheckboxItem
          index={index}
          AccordionData={item.data}
          selectedData={selectedData}
          setState={setState}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};
