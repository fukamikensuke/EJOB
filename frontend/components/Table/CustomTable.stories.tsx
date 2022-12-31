import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CustomTable } from "./CustomTable";

export default {
  title: "CustomTable",
  component: CustomTable,
} as ComponentMeta<typeof CustomTable>;

const Template: ComponentStory<typeof CustomTable> = (args) => (
  <CustomTable {...args} />
);

export const Sample = Template.bind({});
Sample.args = {
  tableDataListApi: [
    {
      id: 1,
      companyName: "A社",
      evaluation: "1",
      period: "nヶ月",
      job: "エンジニア",
      salary: "1000",
    },
    {
      id: 2,
      companyName: "B社",
      evaluation: "1",
      period: "nヶ月",
      job: "エンジニア",
      salary: "1000",
    },
    {
      id: 3,
      companyName: "C社",
      evaluation: "3",
      period: "nヶ月",
      job: "エンジニア",
      salary: "1000",
    },
  ],
};
