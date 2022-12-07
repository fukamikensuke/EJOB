import React, { Dispatch, SetStateAction } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { CheckboxItem } from "./CheckboxItem";

const AccordionItemDict = {
  evaluation: "総合評価",
  internType: "インターン種別",
  period: "期間",
  jobType: "職種",
  salary: "給与",
};

type Props = {
  id: number;
  item: {
    id: string;
    data: { id: number; text: string }[];
  };
};

export const CustomAccordionItem = ({ item }: Props) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="center">
          {
            AccordionItemDict[
              item.id as
                | "evaluation"
                | "internType"
                | "period"
                | "jobType"
                | "salary"
            ]
          }
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel p={4}>
        <CheckboxItem AccordionData={item.data} />
      </AccordionPanel>
    </AccordionItem>
  );
};
