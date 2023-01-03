import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CustomTable } from "./CustomTable";

export default {
  title: "CustomTable",
  component: CustomTable,
} as ComponentMeta<typeof CustomTable>;

const Template: ComponentStory<typeof CustomTable> = (args) => (
  <CustomTable {...args} />
);

type TableData = {
  id: number;
  companyName: string;
  evaluation: string;
  period: string;
  job: string;
  salary: string;
};

const createTableDataList = () => {
  const dataset: TableData[] = [];
  for (let i = 0; i <= 100; i++) {
    const addData: TableData = {
      id: i,
      companyName: `${i + 1}社`,
      evaluation: `${Math.round(Math.random() * (5 - 1) + 1)}`,
      period: `${i}ヶ月`,
      job: "エンジニア",
      salary: `${i}`,
    };
    dataset.push(addData);
  }
  return dataset;
};

export const Sample = Template.bind({});
Sample.args = {
  tableDataListApi: createTableDataList(),
};
