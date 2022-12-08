import React from "react";
import { NextRouter, useRouter } from "next/router";
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

const tableBody = (props: TableItem, router: NextRouter) => {
  return (
    <Tr
      onClick={() => {
        router.push(`/intern-info/${props.id}`);
      }}
    >
      <Td>{props.company}</Td>
      <Td>{props.evaluation}</Td>
      <Td>{props.period}</Td>
      <Td>{props.jobType}</Td>
      <Td>{props.salary}</Td>
    </Tr>
  );
};

export const CustomTable = () => {
  const router = useRouter();
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
            return tableBody(tableData, router);
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
