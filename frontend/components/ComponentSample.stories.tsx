import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ComponentSample } from "./ComponentSample";

export default {
  title: "Example/ComponentSample",
  component: ComponentSample,
} as ComponentMeta<typeof ComponentSample>;

const Template: ComponentStory<typeof ComponentSample> = (args) => (
  <ComponentSample {...args} />
);

export const Sample = Template.bind({});
Sample.args = {
  text: "!!!!!!!",
};
