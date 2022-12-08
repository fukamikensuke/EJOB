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

type EnteredInfoType = {
  company: string;
  year: number;
  internType: number;
  period: number;
  jobType: number;
  salary: number;
  internContents: string;
  evaluation: number; //1-5
  developEx: number; // 入力は必須ではないため、未入力のときは -1 を送る
  internEx: number; // 入力は必須ではないため、未入力のときは -1 を送る
  internTestPreparation: string;
  isSelectionExemption: number; // 0 or 1
  selectionExemptionContents: string;
  impressions: string;
  userId: string;
};

// TODO: 入力周りの refactor する
export const InputForm = () => {
  const [isSearchDisable, setIsSearchDisable] = useState<boolean>(true);
  const [enteredInfo, setEnteredInfo] = useState<EnteredInfoType>({
    company: "",
    year: -1,
    internType: -1,
    period: -1,
    jobType: -1,
    salary: -1,
    internContents: "",
    evaluation: -1, //1-5
    developEx: -1, // 入力は必須ではないため、未入力のときは -1 を送る
    internEx: -1, // 入力は必須ではないため、未入力のときは -1 を送る
    internTestPreparation: "",
    isSelectionExemption: -1, // 0 or 1
    selectionExemptionContents: "",
    impressions: "",
    userId: "",
  });

  console.log(enteredInfo);
  // style 用の変数の定義
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
        <Input
          w={WLarge}
          placeholder="企業名"
          onChange={(event) => {
            let newData = { ...enteredInfo };
            newData.company = event.target.value;
            setEnteredInfo(newData);
          }}
        />
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
            <Input
              type="number"
              placeholder="時給"
              onChange={(event) => {
                let newData = { ...enteredInfo };
                newData.salary = event.target.value as unknown as number; //FIXME: 型の修正
                setEnteredInfo(newData);
              }}
            />
            <InputRightAddon children="円" />
          </InputGroup>
        </HStack>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターンの内容※</Text>
        <Textarea
          w={WLarge}
          size="lg"
          placeholder="インターン内容"
          onChange={(event) => {
            let newData = { ...enteredInfo };
            newData.internContents = event.target.value;
            setEnteredInfo(newData);
          }}
        />
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
      <Textarea
        size="lg"
        placeholder="内容"
        onChange={(event) => {
          let newData = { ...enteredInfo };
          newData.internTestPreparation = event.target.value;
          setEnteredInfo(newData);
        }}
      />
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
      <Textarea
        size="lg"
        placeholder="免除となった内容"
        onChange={(event) => {
          let newData = { ...enteredInfo };
          newData.selectionExemptionContents = event.target.value;
          setEnteredInfo(newData);
        }}
      />

      <VSpacer size={spaceBetweenTitle} />

      <Text fontSize="2xl">最後に</Text>
      <VSpacer size={spaceBetweenItems} />
      <Text>全体の感想(参加して良かったことや改善点など)※</Text>
      <VSpacer size={spaceBetweenItems} />
      <Textarea
        size="lg"
        placeholder="感想"
        onChange={(event) => {
          let newData = { ...enteredInfo };
          newData.impressions = event.target.value;
          setEnteredInfo(newData);
        }}
      />

      <VSpacer size={spaceBetweenItems} />
      <Center>
        <Button colorScheme="blue" isDisabled={isSearchDisable}>
          送信
        </Button>
      </Center>
    </>
  );
};
