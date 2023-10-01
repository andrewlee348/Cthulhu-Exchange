// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React, { useState, useEffect } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import CryptoTable from "views/admin/default/components/CryptoTable";

export const colassets = [
  {
    Header: "Asset",
    accessor: "asset",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Balance",
    accessor: "balance",
  },
];

// API will return an array of size two. First array element is total balance of wallet.
// Second array element is array of owned Crypto following the mockData format.

// Going to have to remap data from api call in stead of mockData to correct accessor names
const totalBalance = 2203.26431631;
const mockData = [
  {
    price: 26915, //current_price
    id: "bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    name: "Bitcoin",
    asset: "btc", // symbol
    balance_cash: 749.58275,
    balance: 0.02785,
  },
  {
    price: 1670.28,
    id: "ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    name: "Ethereum",
    asset: "eth",
    balance_cash: 732.4845912,
    balance: 0.43854,
  },
  {
    price: 0.517443,
    id: "ripple",
    image:
      "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
    name: "XRP",
    asset: "xrp",
    balance_cash: 721.19697511,
    balance: 1393.77086,
  },
];

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
  // const [cryptoData, setCryptoData] = useState([]);
  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      padding="15px 30px 30px 30px"
      {...rest}
    >
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Text color={textColor} fontSize="36px" fontWeight="500">
            Crypto
          </Text>
          <Text
            ms="auto"
            align="center"
            justifyContent="center"
            fontSize="30px"
            fontWeight="500"
          >
            ${totalBalance.toFixed(2)}
          </Text>
        </Flex>
      </Flex>
      <CryptoTable columnsData={colassets} tableData={mockData} />
      <Flex justify="flex-start">
        <Button
          variant="darkBrand"
          color="white"
          fontSize="sm"
          fontWeight="500"
          borderRadius="70px"
          px="16px"
          py="5px"
        >
          Buy
        </Button>
        <Button
          variant="darkBrand"
          color="white"
          fontSize="sm"
          fontWeight="500"
          borderRadius="70px"
          px="16px"
          py="5px"
          ml="10px"
        >
          Sell
        </Button>
        <Button
          variant="darkBrand"
          color="white"
          fontSize="sm"
          fontWeight="500"
          borderRadius="70px"
          px="16px"
          py="5px"
          ml="10px"
        >
          Convert
        </Button>
      </Flex>
    </Card>
  );
}
