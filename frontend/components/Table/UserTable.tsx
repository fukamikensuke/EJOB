import React, { useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { tableDataList } from "../../store/dummyData";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { VSpacer } from "../Spacer/Spacer";

type TableItem = {
  id: number;
  company: string;
  evaluation: string;
  period: string;
  jobType: string;
  salary: string;
};

const tableBody = (props: TableItem) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cancelRef = useRef();

  return (
    <Tr>
      <Td>{props.company}</Td>
      <Td>{props.evaluation}</Td>
      <Td>{props.period}</Td>
      <Td>{props.jobType}</Td>
      <Td>{props.salary}</Td>
      <Td>
        <Icon as={FiEdit} />
      </Td>
      <Td>
        <Icon as={RiDeleteBinLine} onClick={onOpen} />
        <AlertDialog
          isOpen={isOpen}
          // FIXME: 警告を削除する
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <VSpacer size={10} />
              <AlertDialogBody>
                ### に関する投稿を削除してよろしいですか？
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  キャンセル
                </Button>
                <Button colorScheme="red" onClick={onClose} ml={3}>
                  削除
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Td>
    </Tr>
  );
};

export const UserTable = () => {
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
            <Th>編集</Th>
            <Th>削除</Th>
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
