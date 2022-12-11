import React, { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { VSpacer } from "../Spacer/Spacer";
import { CustomText } from "./CustomText";
import axios, { AxiosRequestConfig } from "axios";
import { Badge } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Heading,Stack,StackDivider,Box } from '@chakra-ui/react'
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

  let displayEvaluation = "";

  if (displayInternInfoAPI.evaluation.match(/1/)) {
    displayEvaluation = "★☆☆☆☆";
  }
  if (displayInternInfoAPI.evaluation.match(/2/)) {
    displayEvaluation = "★★☆☆☆";
  }
  if (displayInternInfoAPI.evaluation.match(/3/)) {
    displayEvaluation = "★★★☆☆";
  }
  if (displayInternInfoAPI.evaluation.match(/4/)) {
    displayEvaluation = "★★★★☆";
  }
  if (displayInternInfoAPI.evaluation.match(/5/)) {
    displayEvaluation = "★★★★★";
  }

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
      <Text style={{ color: 'orange', fontSize: 40 }}>{displayEvaluation}</Text>
      <Card>
      <CardHeader>
      <Badge  fontSize="2xl">インターンの情報</Badge>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              <Badge variant='outline' colorScheme='green' fontSize='1.3em'>企業名</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
            <CustomText width={WLarge} text={displayInternInfoAPI.companyName} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              <Badge variant='outline' colorScheme='green' fontSize='1.3em'>参加年度</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.year} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            <Badge variant='outline' colorScheme='green'fontSize='1.3em'>インターン種別</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.internType} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            <Badge variant='outline' colorScheme='green'fontSize='1.3em'>期間</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.period} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            <Badge variant='outline' colorScheme='green'fontSize='1.3em'>職種</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.job} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            <Badge variant='outline' colorScheme='green'fontSize='1.3em'>報酬（時給）</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.salary} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            <Badge variant='outline' colorScheme='green' fontSize='1.3em'>インターンの内容</Badge>
            </Heading>
            <Text pt='2' fontSize='l'>
              <CustomText width={WLarge} text={displayInternInfoAPI.internContents} />
            </Text>
          </Box>
        </Stack>
        </CardBody>
      </Card>
      <VSpacer size={12} />
      <Card>
      <CardHeader>
        <Badge fontSize="2xl">インターン選考時の情報</Badge>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              <Badge variant='outline' colorScheme='green'fontSize='1.3em'>選考時の趣味開発やハッカソン等での開発経験</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
            <CustomText width={WLarge} text={displayInternInfoAPI.developEx} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              <Badge variant='outline' colorScheme='green'fontSize='1.3em'>選考時のインターンへの参加経験</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.internEx} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            <Badge variant='outline' colorScheme='green'fontSize='1.3em'>インターンの選考対策として行ったことがあれば教えてください</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.internTestPreparation} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            <Badge variant='outline' colorScheme='green'fontSize='1.3em'>インターンに参加したことでその先の選考の免除があったか</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.isSelectionExemption} />
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            <Badge variant='outline' colorScheme='green'fontSize='1.3em'>免除の内容</Badge>
            </Heading>
            <Text pt='2' fontSize='sl'>
              <CustomText width={WLarge} text={displayInternInfoAPI.selectionExemptionContents} />
            </Text>
          </Box>
          
        </Stack>
        </CardBody>
      </Card>
      <VSpacer size={12} />
      <Card>
      <CardHeader>
        <Badge fontSize="2xl">全体の感想</Badge>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='10'>
          <Box>
            <CustomText width={WLarge} text={displayInternInfoAPI.impressions} />
          </Box>
          
        </Stack>
        </CardBody>
      </Card>
      <VSpacer size={12} />


    </>
  );
};
