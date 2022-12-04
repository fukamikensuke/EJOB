import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Filter } from "./Filter";

export default {
  title: "Filter",
  component: Filter,
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = () => <Filter />;

export const Sample = Template.bind({});
