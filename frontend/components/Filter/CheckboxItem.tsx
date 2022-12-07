import React from "react";
import { VStack, Checkbox } from "@chakra-ui/react";

// TODO: setState のバケツリレーを辞めたい
type Props = {
  AccordionData: { id: number; text: string }[];
};

export const CheckboxItem = ({ AccordionData }: Props) => {
  return (
    <VStack>
      {AccordionData.map((prop) => {
        return (
          // TODO: 型定義の修正 (as の使用をうまく避けたい)
          <Checkbox key={prop.id} value={prop.id}>
            {prop.text}
          </Checkbox>
        );
      })}
    </VStack>
  );
};
