import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InputForm } from "./InputForm";

export default {
  title: "InputForm",
  component: InputForm,
} as ComponentMeta<typeof InputForm>;

const Template: ComponentStory<typeof InputForm> = (args) => (
  <InputForm {...args} />
);

export const Sample = Template.bind({});
Sample.args = {
  isEdit: false,
};
