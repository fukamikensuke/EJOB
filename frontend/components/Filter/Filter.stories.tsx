import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Filter } from "./Filter";

export default {
  title: "Filter",
  component: Filter,
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  filterDataList: [
    {
      displayName: "###1###",
      data: [
        { id: 1, text: "---1---" },
        { id: 2, text: "---2---" },
        { id: 3, text: "---3---" },
        { id: 4, text: "---4---" },
        { id: 5, text: "---5---" },
      ],
    },
    {
      displayName: "###2###",
      data: [
        { id: 1, text: "---1---" },
        { id: 2, text: "---2---" },
        { id: 3, text: "---3---" },
        { id: 4, text: "---4---" },
        { id: 5, text: "---5---" },
      ],
    },
    {
      displayName: "###3###",
      data: [
        { id: 1, text: "---1---" },
        { id: 2, text: "---2---" },
        { id: 3, text: "---3---" },
        { id: 4, text: "---4---" },
        { id: 5, text: "---5---" },
      ],
    },
  ],
};
