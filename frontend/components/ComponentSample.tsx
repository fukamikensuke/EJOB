import React from "react";

type Props = {
  text: string;
};

export const ComponentSample = ({ text }: Props) => {
  return <h2>{text}</h2>;
};
