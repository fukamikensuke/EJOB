import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
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

  const mediaType = useBreakpointValue({ base: "phone", md: "pc" });
  const [size, setSize] = useState<Size>({
    imageSize: 12,
    stackSizeLarge: "90%",
    stackSizeSmall: "10%",
    headerTextSize: "xl",
    loginButtonSize: "md",
    avatarSize: "md",
  });
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
        imageSize: 12,
        stackSizeLarge: "90%",
        stackSizeSmall: "10%",
        headerTextSize: "xl",
        loginButtonSize: "md",
        avatarSize: "md",
      });
    }
  }, [mediaType]);

  return (
    <>
      <Box bg="blue.100" p={2}>
        <HStack>
          <HStack w={size.stackSizeLarge}>
            <Image
              boxSize={size.imageSize}
              // NOTE: ログイン時の画像 URL は isLogin に応じてこのファイルで取得する(Recoil を使用する予定)
              src="https://bit.ly/dan-abramov"
              alt="logo"
            />
            {/* TODO: サービス名を入れる */}
            <Text fontSize={size.headerTextSize}>すごいヘッダー</Text>
          </HStack>
          {loginStatus.isLogin ? (
            <HStack w={size.stackSizeSmall}>
              <PlusSquareIcon boxSize={size.imageSize} />
              <Popover>
                <PopoverTrigger>
                  {/* TODO: _hover を作用させる */}
                  <Avatar
                    size={size.avatarSize}
                    name="###"
                    src="https://bit.ly/dan-abramov"
                  />
                </PopoverTrigger>
                <PopoverContent p={0}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <VStack>
                      <Button variant="ghost">投稿情報</Button>
                      <Button
                        variant="ghost"
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
              leftIcon={<FcGoogle />}
              borderColor="white"
              variant="outline"
              size={size.loginButtonSize}
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
