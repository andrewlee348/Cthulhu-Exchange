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
import React, { useState, useEffect, useRef } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";

const lineChartDataTotalSpent = [
  {
    name: "Revenue",
    data: [55000, 64, 48, 66, 49, 68, 50],
  },
];

const testOptions = {
  chart: {
    type: "area",
    stacked: false,
    zoom: {
      type: "x",
      enabled: false,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
  },
  dataLabels: {
    enabled: false,
  },

  annotations: {
    yaxis: [
      {
        y: 30,
        borderColor: "#999",
        label: {
          show: true,
          text: "Support",
          style: {
            color: "#fff",
            background: "#00E396",
          },
        },
      },
    ],
    xaxis: [
      {
        x: new Date("14 Nov 2012").getTime(),
        borderColor: "#999",
        yAxisIndex: 0,
        label: {
          show: true,
          text: "Rally",
          style: {
            color: "#fff",
            background: "#8D5DD0",
          },
        },
      },
    ],
  },
  markers: {
    size: 0,
    style: "hollow",
    colors: "#AAAAAA",
  },
  title: {
    text: "",
    align: "left",
  },
  fill: {
    colors: ["#FFAF00"],
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
  stroke: {
    curve: "smooth",
    type: "line",
    colors: ["#FFAF00"],
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return val.toFixed(0);
        // (val / 1000000).toFixed(0);
      },
    },
    title: {
      text: "",
    },
  },
  xaxis: {
    type: "datetime",
    title: {
      text: "",
    },
    labels: {
      formatter: function (val) {
        const date = new Date(val);
        const minute = date.getMinutes();
        const hour = date.getHours();
        const day = date.getDate();
        const month = date.toLocaleString("en-us", { month: "short" }); // Get short month name (e.g., "Sep")
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      },
    },
    tickAmount: 6,
  },
  tooltip: {
    fillSeriesColor: false,
    marker: {
      show: false,
    },

    x: {
      show: true,
      format: "dd MMM yyyy",
    },
    shared: false,
    y: {
      title: {
        formatter: function (val) {
          return;
        },
      },
      formatter: function (val) {
        return "$" + val.toFixed(2);
        //  (val / 1000000).toFixed(0)
      },
    },
  },
};

export default function Chart({ coinData, gD, ...rest }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondarxyGray.600", "white");
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

  const chartRef = useRef(null);

  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (gD) {
      setGraphData(gD[2]);
      console.log("YEET", gD[2]);
      chartRef.current.updateData(gD[2][0]);
    }
  }, [gD]);

  const handleGraphInterval = (graphInterval) => {
    let chartIndex = 0;
    if (graphInterval === "day") {
      chartIndex = 0;
    } else if (graphInterval === "week") {
      chartIndex = 1;
    } else if (graphInterval === "month") {
      chartIndex = 2;
    } else if (graphInterval === "quarter") {
      chartIndex = 3;
    } else if (graphInterval === "half") {
      chartIndex = 4;
    } else if (graphInterval === "year") {
      chartIndex = 5;
    }
    setGraphData(gD[chartIndex]);
    // console.log("penis", chartRef.current);
    if (gD && graphData) {
      chartRef.current.updateData(gD[chartIndex]);
    }
  };

  return gD ? (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...rest}
    >
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Button
            bg={boxBg}
            fontSize="sm"
            fontWeight="500"
            color={textColorSecondary}
            borderRadius="7px"
            onClick={() => handleGraphInterval("month")}
          >
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me="4px"
            />
            This month
          </Button>
          <Button
            ms="auto"
            align="center"
            justifyContent="center"
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="37px"
            h="37px"
            lineHeight="100%"
            borderRadius="10px"
            {...rest}
          >
            <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
          </Button>
        </Flex>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection="column" me="20px" mt="28px">
          <Text
            color={textColor}
            fontSize="34px"
            textAlign="start"
            fontWeight="700"
            lineHeight="100%"
          >
            {coinData.market_data.current_price["usd"]}
          </Text>
          <Flex align="center" mb="20px">
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

          <Flex align="center">
            <Icon as={IoCheckmarkCircle} color="green.500" me="4px" />
            <Text color="green.500" fontSize="md" fontWeight="700">
              On track
            </Text>
          </Flex>
        </Flex>
        <Box minH="260px" minW="75%" mt="auto">
          <LineChart
            chartData={graphData}
            chartOptions={testOptions}
            ref={chartRef}
          />
        </Box>
      </Flex>
    </Card>
  ) : (
    <></>
  );
}
