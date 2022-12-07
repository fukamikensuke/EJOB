import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { VSpacer } from "../Spacer/Spacer";
import { displayInternInfo } from "../../store/dummyData";
import { CustomText } from "./CustomText";

export const InternInfo = () => {
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
        <Text w={WSmall}>企業名</Text>
        <CustomText width={WLarge} text={displayInternInfo.company} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>参加年度</Text>
        <CustomText width={WLarge} text={displayInternInfo.period} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターン種別</Text>
        <CustomText width={WLarge} text={displayInternInfo.internType} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>期間</Text>
        <CustomText width={WLarge} text={displayInternInfo.period} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>職種</Text>
        <CustomText width={WLarge} text={displayInternInfo.jobType} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>報酬(時給)</Text>
        <CustomText width={WLarge} text={displayInternInfo.salary} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={WSmall}>インターンの内容</Text>
        <CustomText width={WLarge} text={displayInternInfo.internContents} />
      </HStack>

      <VSpacer size={spaceBetweenTitle} />

      <Text fontSize="2xl">インターン選考時の状況について教えてください</Text>

      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={"35%"}>選考時の趣味開発やハッカソン等での開発経験</Text>
        <CustomText width={"65%"} text={displayInternInfo.developEx} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <HStack>
        <Text w={"30%"}>選考時のインターンへの参加経験</Text>
        <CustomText width={"70%"} text={displayInternInfo.internEx} />
      </HStack>
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンの選考対策として行ったことがあれば教えてください</Text>
      <VSpacer size={spaceBetweenItems} />
      <CustomText text={displayInternInfo.internTestPreparation} />
      <VSpacer size={spaceBetweenItems} />
      <Text>インターンに参加したことでその先の選考の免除があったか</Text>
      <VSpacer size={spaceBetweenItems} />
      <CustomText text={displayInternInfo.isSelectionExemption} />
      <VSpacer size={spaceBetweenItems} />
      <Text>免除の内容</Text>
      <VSpacer size={spaceBetweenItems} />
      <CustomText text={displayInternInfo.selectionExemptionContents} />
      <VSpacer size={spaceBetweenItems} />
      <Text>全体の感想(参加して良かったことや改善点など)</Text>
      <VSpacer size={spaceBetweenItems} />
      <CustomText text={displayInternInfo.impressions} />
    </>
  );
};
