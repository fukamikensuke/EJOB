import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { loginState } from "../../store/Recoil";
import { FcGoogle } from "react-icons/fc";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useAuth } from "../../hooks/useAuth";
import { VSpacer } from "../Spacer/Spacer";

type Size = {
  imageSize: number;
  stackSizeLarge: string;
  stackSizeSmall: string;
  headerTextSize: string;
  loginButtonSize: string;
  avatarSize: string;
};
export const Header = () => {
  const { login, logout } = useAuth();
  const loginStatus = useRecoilValue(loginState);
  const setLogin = useSetRecoilState(loginState);
  const router = useRouter();

  const mediaType = useBreakpointValue({ base: "phone", md: "pc" });
  const [size, setSize] = useState<Size>({
    imageSize: 12,
    stackSizeLarge: "90%",
    stackSizeSmall: "10%",
    headerTextSize: "xl",
    loginButtonSize: "md",
    avatarSize: "md",
  });

  // mediaType の変更による style の変更
  useEffect(() => {
    if (mediaType === "phone") {
      setSize({
        imageSize: 8,
        stackSizeLarge: "70%",
        stackSizeSmall: "30%",
        headerTextSize: "md",
        loginButtonSize: "sm",
        avatarSize: "sm",
      });
    } else if (mediaType === "pc") {
      setSize({
        imageSize: 14,
        stackSizeLarge: "92%",
        stackSizeSmall: "%",
        headerTextSize: "4xl",
        loginButtonSize: "md",
        avatarSize: "md",
      });
    }
  }, [mediaType]);

  // ログイン情報が保存されている場合復元する
  useEffect(() => {
    const saveLoginStatusText = localStorage.getItem("loginStatus");

    if (saveLoginStatusText !== null) {
      // FIXME: 復元されるデータは理想的なものを想定しているため、zod などを使った型のチェックが必要
      const restoreLoginData = JSON.parse(saveLoginStatusText);
      setLogin({
        isLogin: true,
        name: restoreLoginData.name,
        photoURL: restoreLoginData.photoURL,
        uid: restoreLoginData.uid,
      });
    }
  }, []);

  return (
    <>
      <Box bg="blue.800" p={2}>
        <HStack>
          <HStack w={size.stackSizeLarge}>
            {/* FIXME: スタイルをレスポンシブに対応させる */}
            <VSpacer size={4} />
            <Image boxSize={size.imageSize} src="/logo.png" alt="logo" />
            <VSpacer size={4} />
            <Text
              fontSize={size.headerTextSize}
              as="b"
              color="white"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/");
              }}
            >
              EJOB
            </Text>
          </HStack>
          {loginStatus.isLogin ? (
            <HStack w={size.stackSizeSmall}>
              <PlusSquareIcon
                boxSize={size.imageSize}
                color="white"
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  router.push("/post");
                }}
              />
              <Popover>
                <PopoverTrigger>
                  {/* TODO: _hover を作用させる */}
                  <Avatar
                    size={size.avatarSize}
                    name={loginStatus.name}
                    src={loginStatus.photoURL}
                    _hover={{ cursor: "pointer" }}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <VStack>
                      <Button
                        variant="link"
                        colorScheme="black"
                        onClick={() => {
                          router.push(`/user/${loginStatus.uid}`);
                        }}
                      >
                        投稿情報
                      </Button>
                      <Button
                        variant="link"
                        colorScheme="black"
                        onClick={() => {
                          logout();
                        }}
                      >
                        ログアウト
                      </Button>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          ) : (
            <Button
              w={size.stackSizeSmall}
              leftIcon={<FcGoogle size={24} />}
              color="white"
              variant="ghost"
              size={size.loginButtonSize}
              _hover={{ textColor: "black", bg: "white" }}
              onClick={() => {
                login();
              }}
            >
              ログイン
            </Button>
          )}
        </HStack>
      </Box>
    </>
  );
};
