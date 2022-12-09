// FIXME: ルールの有効化
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/Recoil";
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
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
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

const handleDelete = (id: number) => {
  // TODO: 削除に関する API の記述
  console.log(`delete of id:${id}`);

  return true;
};

const tableBody = (props: TableItem) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const router = useRouter();
  const loginStatus = useRecoilValue(loginState);

  return (
    <Tr>
      <Td>{props.company}</Td>
      <Td>{props.evaluation}</Td>
      <Td>{props.period}</Td>
      <Td>{props.jobType}</Td>
      <Td>{props.salary}</Td>
      <Td>
        <Icon
          as={FiEdit}
          onClick={() => {
            router.push(`/edit/${loginStatus.uid}/${props.id}`);
          }}
        />
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
                {props.company} に関する投稿を削除してよろしいですか？
              </AlertDialogBody>

              <AlertDialogFooter>
                {/* // FIXME: 警告を削除する */}
                <Button ref={cancelRef} onClick={onClose}>
                  キャンセル
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    const isDelete = handleDelete(props.id);

                    onClose();

                    if (isDelete) {
                      toast({
                        title: "Delete is Success",
                        description: `${props.company} に関する投稿を削除しました`,
                        status: "success",
                        duration: 7000,
                        position: "top",
                        isClosable: true,
                      });

                      // TODO: 表示するデータを更新するレンダーが必要かも！？
                    } else {
                      toast({
                        title: "Error",
                        description: `${props.company} に関する投稿を削除に失敗しました`,
                        status: "error",
                        duration: 7000,
                        position: "top",
                        isClosable: true,
                      });
                    }
                  }}
                  ml={3}
                >
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
