// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";

export default function TotalSpent(props) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="70%"
      mb="0px"
      padding="15px 30px 30px 30px"
      {...rest}
    >
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Text color={textColor} fontSize="36px" fontWeight="500">
            Cash
          </Text>
          <Text
            ms="auto"
            align="center"
            justifyContent="center"
            fontSize="30px"
            fontWeight="500"
          >
            $37.5K
          </Text>
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(2,1fr)" gap={4} mt="10px">
        <GridItem>
          <Flex flexDirection="column" alignItems={"flex-start"}>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="Deposit Amount"
              fontWeight="500"
              size="lg"
            />
            <Button
              variant="darkBrand"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="16px"
              py="5px"
              mt="8px"
            >
              Deposit
            </Button>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex flexDirection="column" alignItems={"flex-start"}>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="Withdrawal Amount"
              fontWeight="500"
              size="lg"
            />
            <Button
              variant="darkBrand"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="16px"
              py="5px"
              mt="8px"
            >
              Withdraw
            </Button>
          </Flex>
        </GridItem>
      </Grid>
      {/* <Flex flexDirection="row" justifyContent={"space-evenly"} mt="15px">
        
        
      </Flex> */}

      {/* <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection="column" me="20px" mt="5px">
          <Flex align="center" mb="20px" mt="10px">
            <Text
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
              mt="4px"
              me="12px"
            >
              Total Spent
            </Text>
            <Flex align="center">
              <Icon as={RiArrowUpSFill} color="green.500" me="2px" mt="2px" />
              <Text color="green.500" fontSize="sm" fontWeight="700">
                +2.45%
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box minH="260px" minW="75%" mt="auto">
          <LineChart
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptionsTotalSpent}
          />
        </Box>
      </Flex> */}
    </Card>
  );
}
