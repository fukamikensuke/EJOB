import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, HStack } from "@chakra-ui/react";
import { Filter } from "../components/Filter/Filter";
import { CustomTable } from "../components/Table/CustomTable";
import { VSpacer, HSpacer } from "../components/Spacer/Spacer";
import { FilterData } from "../types/FilterData";
import { DOMAIN } from "../share/share";

export default function Home() {
  const [tableDataListApi, setTableDataList] = useState([]);
  const [filterData, setFilterData] = useState<FilterData[] | null>(null);

  useEffect(() => {
    // インターン情報の初期値の取得
    const fetchInternInfoDataUrl = DOMAIN + "intern-info-list";
    axios
      .get(fetchInternInfoDataUrl)
      .then((res) => {
        setTableDataList(res.data.data);
        // setFilterData(res.data.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("api error /intern-info-list", error);
      });

    // API からフィルターデータの取得
    const fetchFilterDataUrl = DOMAIN + "search-status";
    axios
      .get(fetchFilterDataUrl)
      .then((res) => {
        setFilterData(res.data.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("api error /search-status", error);
      });
  }, []);

  return (
    <>
      <VSpacer size={4} />
      <HStack>
        <Box w="18%" alignSelf="flex-start">
          <Filter
            filterDataList={filterData}
            setTableDataList={setTableDataList}
          />
        </Box>
        <HSpacer size={8} />
        <Box w="65%" alignSelf="flex-start">
          <CustomTable tableDataListApi={tableDataListApi} />
        </Box>
        <HSpacer size={8} />
      </HStack>
    </>
  );
}
