import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

type TableItem = {
  id: number;
  companyName: string;
  evaluation: string;
  period: string;
  job: string;
  salary: string;
};

const tableBody = (props: TableItem) => {
  return (
    <Tr>
      <Td>{props.companyName}</Td>
      <Td>{props.evaluation}</Td>
      <Td>{props.period}</Td>
      <Td>{props.job}</Td>
      <Td>{props.salary}</Td>
    </Tr>
  );
};

export const CustomTable = () => {
  const [tableDataListApi, setTableDataList] = useState([]);

  useEffect(() => {
    const baseUrl = "http://localhost:8000/intern-info-list";
    const params = {};

    const options: AxiosRequestConfig = {
      url: `${baseUrl}`,
      method: "GET",
      params: params,
    };

    axios(options).then((res) => {
      console.log("option", res);
      setTableDataList(res.data.data);
    });
  }, []);

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
          {tableDataListApi.map((tableData) => {
            // XXX: undefined がどこに起因してるのかわからない
            return tableBody(tableData);
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
