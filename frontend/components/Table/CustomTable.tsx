import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { tableDataList } from "../../store/dummyData";

type TableItem = {
  id: number;
  company: string;
  evaluation: string;
  period: string;
  jobType: string;
  salary: string;
};

const tableBody = (props: TableItem) => {
  return (
    <Tr>
      <Td>{props.company}</Td>
      <Td>{props.evaluation}</Td>
      <Td>{props.period}</Td>
      <Td>{props.jobType}</Td>
      <Td>{props.salary}</Td>
    </Tr>
  );
};

export const CustomTable = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>企業名</Th>
            <Th>評価</Th>
            <Th>期間</Th>
            <Th>職種</Th>
            <Th>給与</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableDataList.map((tableData) => {
            // XXX: undefined がどこに起因してるのかわからない
            return tableBody(tableData);
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
