import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Accordion, Button, Center, VStack } from "@chakra-ui/react";
import { VSpacer } from "../Spacer/Spacer";
import { CustomAccordionItem } from "./CustomAccordionItem";
import { Salary } from "./Salary";
import { DOMAIN } from "../../share/share";
import { FilterData } from "../../types/FilterData";

type PostFilter = {
  evaluation: number | null;
  period: number | null;
  jobType: number | null;
  // internType: number | null;
  salary: number | null;
};

type Props = {
  filterDataList: FilterData[] | null;
  setTableDataList: Dispatch<SetStateAction<never[]>>;
};

export const Filter = ({ filterDataList, setTableDataList }: Props) => {
  const [isSearchDisable, setIsSearchDisable] = useState<boolean>(true);
  const [selectedFilterData, setSelectedFilterData] = useState<
    (number | null)[]
  >([null, null, null, null]);

  // 少なくとも1つでも検索条件が入力されている場合検索ボタンを活性化する
  useEffect(() => {
    if (selectedFilterData) {
      setIsSearchDisable(selectedFilterData.every((x) => x === null));
    }
  }, [selectedFilterData]);

  // 検索ボタンが押された場合に表示する情報を絞り込む
  const handleClick = () => {
    const baseUrl = DOMAIN + "intern-info-list";

    const params: PostFilter = {
      evaluation: selectedFilterData[0],
      jobType: selectedFilterData[1],
      period: selectedFilterData[2],
      salary: selectedFilterData[3],
    };

    const options: AxiosRequestConfig = {
      url: `${baseUrl}`,
      method: "GET",
      params: params,
    };

    axios(options)
      .then((res) => {
        // FIXME: バックエンド側から return される値を res.data で受け取れるようにする
        setTableDataList(res.data.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("error of GET/intern-info-list", error);
      });
  };

  return (
    <>
      <VStack>
        <Accordion allowMultiple w="100%">
          {filterDataList &&
            filterDataList.map((filterData: FilterData, index: number) => {
              return (
                <CustomAccordionItem
                  key={index}
                  index={index}
                  item={filterData}
                  selectedData={selectedFilterData}
                  setState={setSelectedFilterData}
                />
              );
            })}
          <Salary
            selectedFilterData={selectedFilterData}
            setSelectedFilterData={setSelectedFilterData}
          />
        </Accordion>
        <VSpacer size={2} />
        <Center>
          <Button
            colorScheme="blue"
            isDisabled={isSearchDisable}
            onClick={handleClick}
          >
            検索
          </Button>
        </Center>
        <VSpacer size={4} />
      </VStack>
    </>
  );
};
