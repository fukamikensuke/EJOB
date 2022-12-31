import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { VSpacer } from "../Spacer/Spacer";

type TableItem = {
  id: number;
  companyName: string;
  evaluation: string;
  period: string;
  job: string;
  salary: string;
};

const tableBody = (props: TableItem, router: NextRouter) => {
  let displayEvaluation = "";

  if (props.evaluation.match(/1/)) {
    displayEvaluation = "★☆☆☆☆";
  }
  if (props.evaluation.match(/2/)) {
    displayEvaluation = "★★☆☆☆";
  }
  if (props.evaluation.match(/3/)) {
    displayEvaluation = "★★★☆☆";
  }
  if (props.evaluation.match(/4/)) {
    displayEvaluation = "★★★★☆";
  }
  if (props.evaluation.match(/5/)) {
    displayEvaluation = "★★★★★";
  }

  return (
    <Tr
      key={props.id}
      _hover={{ cursor: "pointer" }}
      onClick={() => {
        router.push(`/intern-info/${props.id}`);
      }}
    >
      <Td>{props.companyName}</Td>
      <Td style={{ color: "orange" }}>{displayEvaluation}</Td>
      <Td>{props.period}</Td>
      <Td>{props.job}</Td>
      <Td>{props.salary}円</Td>
    </Tr>
  );
};

type Props = {
  tableDataListApi: TableItem[];
};

export const CustomTable = ({ tableDataListApi }: Props) => {
  const router = useRouter();
  const PAGE_NATION = 15; // マジックナンバー
  const [pageNation, setPageNation] = useState<number>(PAGE_NATION);

  return (
    <>
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
          {/* FIXME: リリース前にページネーションをなんとかする */}
          <Tbody>
            {tableDataListApi.map((tableData, index) => {
              if (pageNation - PAGE_NATION <= index && index < pageNation) {
                return tableBody(tableData, router);
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Center>
        <VStack>
          <VSpacer size={4} />
          <HStack>
            <Button
              variant="outline"
              onClick={() => {
                setPageNation(PAGE_NATION);
              }}
            >
              1
            </Button>
            {14 < tableDataListApi.length && (
              <Button
                variant="outline"
                onClick={() => {
                  setPageNation(PAGE_NATION * 2);
                }}
              >
                2
              </Button>
            )}
          </HStack>
        </VStack>
      </Center>
    </>
  );
};
