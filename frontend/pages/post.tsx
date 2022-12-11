import React from "react";
import { useRecoilValue } from "recoil";
import {
  Card,
  CardBody,
  Container,
  Center,
  Text,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { loginState } from "../store/Recoil";
// FIXME: ファイル名の修正(大文字のキャメルケース)
import { InputForm } from "../components/inputForm/InputForm";
import { VSpacer } from "../components/Spacer/Spacer";
import { IoMdInformationCircle } from "react-icons/io";

export default function Post() {
  const loginStatus = useRecoilValue(loginState);

  return (
    <>
      <Container maxW="4xl">
        {loginStatus.isLogin ? (
          <InputForm isEdit={false} />
        ) : (
          <Container maxW="xl">
            <VSpacer size={8} />
            <Card>
              <CardBody>
                <Center>
                  <VStack>
                    <Icon as={IoMdInformationCircle} boxSize={10} />
                    <Text fontSize="lg">
                      インターン情報の投稿はログインしているユーザーのみご利用いただけます。
                    </Text>
                  </VStack>
                </Center>
              </CardBody>
            </Card>
          </Container>
        )}
      </Container>
    </>
  );
}
