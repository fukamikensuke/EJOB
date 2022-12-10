import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Header } from "../components/Header/Header";
import { Filter } from "../components/Filter/Filter";
import { Box, HStack } from "@chakra-ui/react";
import { CustomTable } from "../components/Table/CustomTable";
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
      params.period = selectedFilterData[0];
    }
    if (selectedFilterData[1] !== null) {
      params.internType = selectedFilterData[1];
    }
    if (selectedFilterData[2] !== null) {
      params.jobType = selectedFilterData[2];
    }
    if (selectedFilterData[3] !== null) {
      params.evaluation = selectedFilterData[3];
    }
    if (selectedFilterData[4] !== null) {
      params.salary = selectedFilterData[4];
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
  }, [isPostFilter]);

  return (
    <>
      <Header />
      <HStack>
        <Box w="25%" alignSelf="flex-start">
          <Filter
            selectedFilterData={selectedFilterData}
            setSelectedFilterData={setSelectedFilterData}
            isPostFilter={isPostFilter}
            setIsPostFilter={setIsPostFilter}
          />
        </Box>
        <Box w="75%" alignSelf="flex-start">
          <CustomTable tableDataListApi={tableDataListApi} />
        </Box>
      </HStack>
    </>
  );
}
