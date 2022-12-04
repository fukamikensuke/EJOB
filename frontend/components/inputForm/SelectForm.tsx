import { HStack, Text, Select } from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  placeholder: string;
  data: { id: number; text: string }[];
  isRequire: boolean;
  WLarge: string;
  WSmall: string;
};
export const SelectForm = ({
  title,
  placeholder,
  data,
  isRequire,
  WLarge,
  WSmall,
}: Props) => {
  return (
    <HStack>
      {isRequire ? (
        <Text w={WSmall}>{title}※</Text>
      ) : (
        <Text w={WSmall}>{title}</Text>
      )}
      <Select w={WLarge} placeholder={placeholder}>
        {data.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.text}
            </option>
          );
        })}
      </Select>
    </HStack>
  );
};
