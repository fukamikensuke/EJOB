import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InternInfo } from "./InternInfo";

export default {
  title: "InternInfo",
  component: InternInfo,
} as ComponentMeta<typeof InternInfo>;

const Template: ComponentStory<typeof InternInfo> = () => <InternInfo />;

export const Sample = Template.bind({});
