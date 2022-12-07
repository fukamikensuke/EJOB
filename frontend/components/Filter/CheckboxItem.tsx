import React from "react";
import { VStack, Checkbox } from "@chakra-ui/react";

// TODO: setState のバケツリレーを辞めたい
type Props = {
  index: number;
  AccordionData: { id: number; text: string }[];
  selectedData: (number | null)[];
  setState: React.Dispatch<React.SetStateAction<(number | null)[]>>;
};

export const CheckboxItem = ({
  index,
  AccordionData,
  selectedData,
  setState,
}: Props) => {
  return (
    <VStack>
      {AccordionData.map((prop) => {
        return (
          // TODO: 型定義の修正 (as の使用をうまく避けたい)
          <Checkbox
            key={prop.id}
            onChange={() => {
              if (prop.id === selectedData[index]) {
                let newArray = [...selectedData];
                newArray[index] = null;
                setState(newArray);
              } else {
                let newArray = [...selectedData];
                newArray[index] = prop.id;
                setState(newArray);
              }
            }}
            isChecked={prop.id === selectedData[index]}
          >
            {prop.text}
          </Checkbox>
        );
      })}
    </VStack>
  );
};
