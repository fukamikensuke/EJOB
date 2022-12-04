import { Checkbox, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  props: { id: number; text: string }[];
};
export const CheckboxItem = ({ props }: Props) => {
  return (
    <VStack>
      {props.map((prop) => {
        return <Checkbox key={prop.id}>{prop.text}</Checkbox>;
      })}
    </VStack>
  );
};
