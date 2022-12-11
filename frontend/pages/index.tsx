import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Filter } from "../components/Filter/Filter";
import { Box, HStack } from "@chakra-ui/react";
import { CustomTable } from "../components/Table/CustomTable";
import { VSpacer, HSpacer } from "../components/Spacer/Spacer";
export default function Home() {
  const [tableDataListApi, setTableDataList] = useState([]);
  const [selectedFilterData, setSelectedFilterData] = useState<
    (number | null)[]
  >([null, null, null, null, null]);
  const [isPostFilter, setIsPostFilter] = useState<boolean>(false);

  useEffect(() => {
    const baseUrl = "http://localhost:8000/intern-info-list";

    type PostFilter = {
      evaluation?: number | null;
      jobType?: number | null;
      internType?: number | null;
      period?: number | null;
      salary?: number | null;
    };
    const params: PostFilter = {};

    if (selectedFilterData[0] !== null) {
      params.evaluation = selectedFilterData[0];
    }
    if (selectedFilterData[1] !== null) {
      params.period = selectedFilterData[1];
    }
    if (selectedFilterData[2] !== null) {
      params.jobType = selectedFilterData[2];
    }
    if (selectedFilterData[3] !== null) {
      params.salary = selectedFilterData[3];
    }

    const options: AxiosRequestConfig = {
      url: `${baseUrl}`,
      method: "GET",
      params: params,
    };

    axios(options)
      .then((res) => {
        setTableDataList(res.data.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("error of GET/intern-info-list", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostFilter]);

  return (
    <>
      <VSpacer size={4} />
      <HStack>
        <Box w="18%" alignSelf="flex-start">
          <Filter
            selectedFilterData={selectedFilterData}
            setSelectedFilterData={setSelectedFilterData}
            isPostFilter={isPostFilter}
            setIsPostFilter={setIsPostFilter}
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
