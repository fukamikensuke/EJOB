import React from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  width?: string;
  text: string;
};

export const CustomText = ({ text, width }: Props) => {
  if (width) {
    return text === "" ? (
      <Text w={width}>未回答</Text>
    ) : (
      <Text w={width}>{text}</Text>
    );
  } else {
    return text === "" ? <Text>未回答</Text> : <Text>{text}</Text>;
  }
};
