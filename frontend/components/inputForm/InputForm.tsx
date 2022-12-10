// FIXME: 下のルールを有効にできるようにする
/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import {
  Center,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { VSpacer } from "../Spacer/Spacer";
import { SelectForm } from "./SelectForm";
import { inputFormData } from "../../store/dummyData";

export const InputForm = () => {
  const [isSearchDisable, setIsSearchDisable] = useState<boolean>(true);

  const WLarge = "85%";
  const WSmall = "15%";
  const spaceBetweenItems = 4;
  const spaceBetweenTitle = 16;

  return (
    <>
      <Text fontSize="2xl">インターン情報について教えて下さい</Text>
      <Text fontSize="md">※は必須項目です</Text>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>企業名※</Text>
        <Input w={WLarge} placeholder="企業名" />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <SelectForm
        title="参加年度"
        placeholder="年"
        data={inputFormData.year}
        isRequire={true}
        WLarge={WLarge}
        WSmall={WSmall}
      />
      <VSpacer size={spaceBetweenItems} />
      <SelectForm
        title="インターン種別"
        placeholder="インターン種別"
        data={inputFormData.internType}
        isRequire={true}
        WLarge={WLarge}
        WSmall={WSmall}
      />
      <VSpacer size={spaceBetweenItems} />
      <SelectForm
        title="期間"
        placeholder="期間"
        data={inputFormData.period}
        isRequire={true}
        WLarge={WLarge}
        WSmall={WSmall}
      />
      <VSpacer size={spaceBetweenItems} />
      <SelectForm
        title="職種"
        placeholder="職種"
        data={inputFormData.jobType}
        isRequire={true}
        WLarge={WLarge}
        WSmall={WSmall}
      />
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>報酬(時給換算)※</Text>
        <HStack w={WLarge}>
          <InputGroup size="md">
            <Input type="number" placeholder="時給" />
            <InputRightAddon children="円" />
          </InputGroup>
        </HStack>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターンの内容※</Text>
        <Textarea w={WLarge} size="lg" placeholder="インターン内容" />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <SelectForm
        title="総合評価"
        placeholder="総合評価"
        data={inputFormData.evaluation}
        isRequire={true}
        WLarge={WLarge}
        WSmall={WSmall}
      />
      <VSpacer size={spaceBetweenTitle} />

      <Text fontSize="2xl">インターン選考時の状況について教えてください</Text>

      <VSpacer size={spaceBetweenItems} />
      <SelectForm
        title="選考時の趣味開発やハッカソン等での開発経験"
        placeholder="開発経験"
        data={inputFormData.developEx}
        isRequire={false}
        WLarge={"70%"}
        WSmall={"30%"}
      />
      <VSpacer size={spaceBetweenItems} />
      <SelectForm
        title="選考時のインターンへの参加経験"
        placeholder="インターンへの参加経験"
        data={inputFormData.internEx}
        isRequire={false}
        WLarge={"70%"}
        WSmall={"30%"}
      />
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンの選考対策として行ったことがあれば教えてください</Text>
      <VSpacer size={spaceBetweenItems} />
      <Textarea size="lg" placeholder="内容" />
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンに参加したことでその先の選考の免除があったか</Text>
      <VSpacer size={spaceBetweenItems} />
      <RadioGroup>
        <HStack>
          <Radio value="1">あり</Radio>
          <Radio value="0">なし</Radio>
        </HStack>
      </RadioGroup>
      <VSpacer size={spaceBetweenItems} />
      <Textarea size="lg" placeholder="免除となった内容" />

      <VSpacer size={spaceBetweenTitle} />

      <Text fontSize="2xl">最後に</Text>
      <VSpacer size={spaceBetweenItems} />
      <Text>全体の感想(参加して良かったことや改善点など)※</Text>
      <VSpacer size={spaceBetweenItems} />
      <Textarea size="lg" placeholder="感想" />

      <VSpacer size={spaceBetweenItems} />
      <Center>
        <Button colorScheme="blue" isDisabled={isSearchDisable}>
          送信
        </Button>
      </Center>
    </>
  );
};
