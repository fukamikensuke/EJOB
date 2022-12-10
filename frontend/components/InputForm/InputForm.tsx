// FIXME: 下のルールを有効にできるようにする
// 時給入力の「円」を child として渡しているとこで出ている
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/Recoil";
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
  Select,
} from "@chakra-ui/react";
import { VSpacer } from "../Spacer/Spacer";
import axios from "axios";

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
// TODO: render が多すぎて performance が低い

type Props = {
  isEdit: boolean;
};

type inputSelect = {
  evaluation: { id: number; text: string }[];
  year: { id: number; text: string }[];
  internType: { id: number; text: string }[];
  period: { id: number; text: string }[];
  jobType: { id: number; text: string }[];
  developEx: { id: number; text: string }[];
  internEx: { id: number; text: string }[];
};

const settingDefaultValue = (isEdit: boolean, uid: string) => {
  // isEdit === true の場合、API から取得してきたデータを初期値とする
  if (isEdit === false) {
    return {
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
      userId: uid,
    };
  } else {
    // TODO: 編集の場合に API からデータを取得してくるようにする
    return {
      company: "#####",
      year: 1,
      internType: 1,
      period: 1,
      jobType: 1,
      salary: 1,
      internContents: "#####",
      evaluation: 1, //1-5
      developEx: -1, // 入力は必須ではないため、未入力のときは -1 を送る
      internEx: -1, // 入力は必須ではないため、未入力のときは -1 を送る
      internTestPreparation: "##########",
      isSelectionExemption: 1, // 0 or 1
      selectionExemptionContents: "",
      impressions: "#########",
      userId: uid,
    };
  }
};

export const InputForm = ({ isEdit }: Props) => {
  const router = useRouter();
  const [isSearchDisable, setIsSearchDisable] = useState<boolean>(true);
  const loginStatus = useRecoilValue(loginState);
  const [inputFormDataAPI, setInputFormDataAPI] = useState<inputSelect>({
    evaluation: [],
    year: [],
    internType: [],
    period: [],
    jobType: [],
    developEx: [],
    internEx: [],
  });
  const [enteredInfo, setEnteredInfo] = useState<EnteredInfoType>(() => {
    return settingDefaultValue(isEdit, loginStatus.uid);
  });
  const [radioButtonValue, setValue] = useState<string>(() => {
    if (isEdit === false) {
      return "";
    } else {
      return enteredInfo.isSelectionExemption === -1
        ? ""
        : (enteredInfo.isSelectionExemption as unknown as string); // FIXME: 型の修正
    }
  });

  // style 用の変数の定義
  const WLarge = "85%";
  const WSmall = "15%";
  const spaceBetweenItems = 4;
  const spaceBetweenTitle = 16;

  // ラジオボタンの変更の検出
  useEffect(() => {
    let newData = { ...enteredInfo };
    newData.isSelectionExemption = Number(radioButtonValue); //FIXME: 型の修正
    setEnteredInfo(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioButtonValue]);

  // 選択式の部分のデータの取得
  useEffect(() => {
    const baseUrl = "http://localhost:8000/input-select-filed";
    axios
      .get(baseUrl)
      .then((res) => {
        setInputFormDataAPI(res.data.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("GET/input-select-filed", error);
      });
  }, []);

  // 必須項目がすべて選択されているかの判定
  useEffect(() => {
    if (
      enteredInfo.company !== "" &&
      enteredInfo.year !== -1 &&
      enteredInfo.internType !== -1 &&
      enteredInfo.period !== -1 &&
      enteredInfo.jobType !== -1 &&
      enteredInfo.salary !== -1 &&
      enteredInfo.internContents !== "" &&
      enteredInfo.evaluation != -1 &&
      enteredInfo.impressions !== ""
    ) {
      setIsSearchDisable(false);
    }
  }, [enteredInfo]);

  const handlePost = () => {
    // XXX: POST を使用した場合 Axios Network Error となりうまく接続できなかった
    const url = `http://localhost:8000/post-intern-info?company=${enteredInfo.company}&year=${enteredInfo.year}&internType=${enteredInfo.internType}&period=${enteredInfo.period}&jobType=${enteredInfo.jobType}&salary=${enteredInfo.salary}&internContents=${enteredInfo.internContents}&evaluation=${enteredInfo.evaluation}&developEx=${enteredInfo.developEx}&internEx=${enteredInfo.internEx}&internTestPreparation=${enteredInfo.internTestPreparation}&isSelectionExemption=${enteredInfo.isSelectionExemption}&selectionExemptionContents=${enteredInfo.selectionExemptionContents}&impressions=${enteredInfo.impressions}&uid=${enteredInfo.uid}`;

    const encodeUrl = encodeURI(url);
    axios
      .get(encodeUrl)
      .then((res) => {
        if (res.data === 200) {
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("POST/", error);
      });
  };

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
          defaultValue={enteredInfo.company}
          onChange={(event) => {
            let newData = { ...enteredInfo };
            newData.company = event.target.value;
            setEnteredInfo(newData);
          }}
        />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>参加年度※</Text>
        <Select
          w={WLarge}
          placeholder="年"
          defaultValue={
            enteredInfo.year === -1
              ? ""
              : (enteredInfo.year as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.year = -1;
            } else {
              newData.year = Number(event.target.value); //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormDataAPI.year.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターン種別※</Text>
        <Select
          w={WLarge}
          placeholder="インターン種別"
          defaultValue={
            enteredInfo.internType === -1
              ? ""
              : (enteredInfo.internType as unknown as string) //FIXME: 型の修正
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.internType = -1;
            } else {
              newData.internType = Number(event.target.value);
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormDataAPI.internType.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>期間※</Text>
        <Select
          w={WLarge}
          placeholder="期間"
          defaultValue={
            enteredInfo.period === -1
              ? ""
              : (enteredInfo.period as unknown as string) //FIXME: 型の修正
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.period = -1;
            } else {
              newData.period = Number(event.target.value); //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormDataAPI.period.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>職種※</Text>
        <Select
          w={WLarge}
          placeholder="職種"
          defaultValue={
            enteredInfo.jobType === -1
              ? ""
              : (enteredInfo.jobType as unknown as string) //FIXME: 型の修正
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.jobType = -1;
            } else {
              newData.jobType = Number(event.target.value); //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormDataAPI.jobType.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>報酬(時給換算)※</Text>
        <HStack w={WLarge}>
          <InputGroup size="md">
            <Input
              type="number"
              placeholder="時給"
              defaultValue={enteredInfo.salary !== -1 ? enteredInfo.salary : ""}
              onChange={(event) => {
                let newData = { ...enteredInfo };
                newData.salary = Number(event.target.value); //FIXME: 型の修正
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
          defaultValue={enteredInfo.internContents}
          onChange={(event) => {
            let newData = { ...enteredInfo };
            newData.internContents = event.target.value;
            setEnteredInfo(newData);
          }}
        />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>総合評価※</Text>
        <Select
          w={WLarge}
          placeholder="総合評価"
          defaultValue={
            enteredInfo.evaluation === -1
              ? ""
              : (enteredInfo.evaluation as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.evaluation = -1;
            } else {
              newData.evaluation = Number(event.target.value); //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormDataAPI.evaluation.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenTitle} />

      <Text fontSize="2xl">インターン選考時の状況について教えてください</Text>

      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={"30%"}>選考時の趣味開発やハッカソン等での開発経験</Text>
        <Select
          w={"70%"}
          placeholder="開発経験"
          defaultValue={
            enteredInfo.developEx === -1
              ? ""
              : (enteredInfo.developEx as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.developEx = -1;
            } else {
              newData.developEx = Number(event.target.value); //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormDataAPI.developEx.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={"30%"}>選考時のインターンへの参加経験</Text>
        <Select
          w={"70%"}
          placeholder="インターンへの参加経験"
          defaultValue={
            enteredInfo.internEx === -1
              ? ""
              : (enteredInfo.internEx as unknown as string)
          }
          onChange={(event) => {
            let newData = { ...enteredInfo };
            if (event.target.value === "") {
              newData.internEx = -1;
            } else {
              newData.internEx = Number(event.target.value); //FIXME: 型の修正
            }
            setEnteredInfo(newData);
          }}
        >
          {inputFormDataAPI.internEx.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            );
          })}
        </Select>
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンの選考対策として行ったことがあれば教えてください</Text>
      <VSpacer size={spaceBetweenItems} />
      <Textarea
        size="lg"
        placeholder="内容"
        defaultValue={enteredInfo.internTestPreparation}
        onChange={(event) => {
          let newData = { ...enteredInfo };
          newData.internTestPreparation = event.target.value;
          setEnteredInfo(newData);
        }}
      />
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンに参加したことでその先の選考の免除があったか</Text>
      <VSpacer size={spaceBetweenItems} />

      <RadioGroup onChange={setValue} value={`${radioButtonValue}`}>
        <HStack>
          <Radio value="1">あり</Radio>
          <Radio value="0">なし</Radio>
        </HStack>
      </RadioGroup>
      <VSpacer size={spaceBetweenItems} />
      <Textarea
        size="lg"
        placeholder="免除となった内容"
        defaultValue={enteredInfo.selectionExemptionContents}
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
        defaultValue={enteredInfo.impressions}
        onChange={(event) => {
          let newData = { ...enteredInfo };
          newData.impressions = event.target.value;
          setEnteredInfo(newData);
        }}
      />

      <VSpacer size={spaceBetweenItems} />
      <Center>
        <Button
          colorScheme="blue"
          isDisabled={isSearchDisable}
          onClick={handlePost}
        >
          送信
        </Button>
      </Center>
    </>
  );
};
