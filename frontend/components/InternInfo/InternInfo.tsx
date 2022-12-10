import React, { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { VSpacer } from "../Spacer/Spacer";
import { CustomText } from "./CustomText";
import axios, { AxiosRequestConfig } from "axios";

type Props = {
  id: string | string[] | undefined;
};

export const InternInfo = ({ id }: Props) => {
  const [displayInternInfoAPI, setDisplayInternInfoAPI] = useState({
    companyName: "",
    year: "",
    internType: "",
    period: "",
    job: "",
    salary: "",
    internContents: "",
    evaluation: "",
    developEx: "",
    internEx: "",
    internTestPreparation: "",
    isSelectionExemption: "",
    selectionExemptionContents: "",
    impressions: "",
  });

  const WLarge = "85%";
  const WSmall = "15%";
  const spaceBetweenItems = 4;
  const spaceBetweenTitle = 16;

  useEffect(() => {
    const baseUrl = `http://localhost:8000/intern-info/${id}`;

    const options: AxiosRequestConfig = {
      url: `${baseUrl}`,
      method: "GET",
    };

    axios(options)
      .then((res) => {
        console.log(res.data);
        setDisplayInternInfoAPI(res.data.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("error of GET/intern-info", error);
      });
  }, []);

  return (
    <>
      <Text fontSize="2xl">インターン情報について教えて下さい</Text>
      <Text fontSize="md">※は必須項目です</Text>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>企業名</Text>
        <CustomText width={WLarge} text={displayInternInfoAPI.companyName} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>参加年度</Text>
        <CustomText width={WLarge} text={displayInternInfoAPI.period} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターン種別</Text>
        <CustomText width={WLarge} text={displayInternInfoAPI.internType} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>期間</Text>
        <CustomText width={WLarge} text={displayInternInfoAPI.period} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>職種</Text>
        <CustomText width={WLarge} text={displayInternInfoAPI.job} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>報酬(時給)</Text>
        <CustomText width={WLarge} text={displayInternInfoAPI.salary} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターンの内容</Text>
        <CustomText width={WLarge} text={displayInternInfoAPI.internContents} />
      </HStack>

      <VSpacer size={spaceBetweenTitle} />

      <Text fontSize="2xl">インターン選考時の状況について教えてください</Text>

      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={"35%"}>選考時の趣味開発やハッカソン等での開発経験</Text>
        <CustomText width={"65%"} text={displayInternInfoAPI.developEx} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={"30%"}>選考時のインターンへの参加経験</Text>
        <CustomText width={"70%"} text={displayInternInfoAPI.internEx} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンの選考対策として行ったことがあれば教えてください</Text>
      <VSpacer size={spaceBetweenItems} />
      <CustomText text={displayInternInfoAPI.internTestPreparation} />
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンに参加したことでその先の選考の免除があったか</Text>
      <VSpacer size={spaceBetweenItems} />
      <CustomText text={displayInternInfoAPI.isSelectionExemption} />
      <VSpacer size={spaceBetweenItems} />
      <Text>免除の内容</Text>
      <VSpacer size={spaceBetweenItems} />
      <CustomText text={displayInternInfoAPI.selectionExemptionContents} />
      <VSpacer size={spaceBetweenItems} />
      <Text>全体の感想(参加して良かったことや改善点など)</Text>
      <VSpacer size={spaceBetweenItems} />
      <CustomText text={displayInternInfoAPI.impressions} />
    </>
  );
};
