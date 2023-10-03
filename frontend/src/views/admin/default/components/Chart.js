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


const lineChartDataTotalSpent = [
  {
    name: "Revenue",
    data: [55000, 64, 48, 66, 49, 68, 50],
  }
];

const testOptions = {
  chart: {
    type: 'area',
    stacked: false,
    zoom: {
      type: 'x',
      enabled: false,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },

  annotations: {

    yaxis: [{
      y: 30,
      borderColor: '#999',
      label: {
        show: true,
        text: 'Support',
        style: {
          color: "#fff",
          background: '#00E396'
        }
      }
    }],
    xaxis: [{
      x: new Date('14 Nov 2012').getTime(),
      borderColor: '#999',
      yAxisIndex: 0,
      label: {
        show: true,
        text: 'Rally',
        style: {
          color: "#fff",
          background: '#8D5DD0'
        }
      }
    }]
  },
  markers: {
    size: 0,
    style: 'hollow',
    colors: '#AAAAAA'
  },
  title: {
    text: '',
    align: 'left'
  },
  fill: {
    colors: ['#FFAF00'],
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100]
    }
  },
  stroke: {
    curve: "straight",
    type: "line",
    colors: ["#FFAF00"]
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return val.toFixed(0)
        // (val / 1000000).toFixed(0);
      },
    },
    title: {
      text: ''
    },
  },
  xaxis: {
    type: 'datetime',
    title: {
      text: ''
    },
    labels: {
      formatter: function (val) {
        const date = new Date(val * 1000); // Convert epoch time to milliseconds
        const day = date.getDate();
        const month = date.toLocaleString('en-us', { month: 'short' }); // Get short month name (e.g., "Sep")

        return `${day} ${month}`;
      }
    },
    tickAmount: 6
  },
  tooltip: {
    fillSeriesColor: false,
    marker: {
      show: false
    },

    x: {
      show: true,
      format: 'dd MMM yyyy'
    },
    shared: false,
    y: {
      title: {
        formatter: function (val) {
          return
        }
      },
      formatter: function (val) {
        return '$' + val.toFixed(2)
        //  (val / 1000000).toFixed(0)
      }
    }
  }
}

export default function TotalSpent({ coinData, graphData, ...rest }) {
  console.log(graphData)
  console.log(0)
  const [options, setOptions] = useState(null)
  useEffect(() => {
    setOptions({
      chart: {
        type: "area",
        toolbar: {
          show: true,
        },
        dropShadow: {
          enabled: true,
          top: 13,
          left: 0,
          blur: 10,
          opacity: 0.1,
          color: "#4318FF",
        },
      },
      plotOptions: {
        area: {
          fillTo: 'end',
        }
      },
      colors: ["#4318FF", "#39B8FF"],
      markers: {
        size: 0,
        colors: "white",
        strokeColors: "#7551FF",
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
      },
      tooltip: {
        theme: "dark",
      },
      dataLabels: {
        enabled: true,
        offsetY: -100
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: "datetime",
        // categories: ["3", "2", "3", "4", "5", "6", "7", "8"],
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        column: {
          color: ["#7551FF", "#39B8FF"],
          opacity: 0.5,
        },
      },
      color: ["#7551FF", "#39B8FF"],
    })
    console.log("options", options)
  }, [graphData]);
  // const [graphPoints, setGraphPoints] = useState()
  // useEffect(() => {
  //   if (!graphPoints || !graphData) {
  //     return;
  //   }
  //   setGraphPoints({
  //     name: "bitcoin",
  //     data: graphData.prices.map((p) => p[0])
  //   });
  //   console.log(setGraphPoints);
  // }, [coinData, graphData]);
  // console.log(graphData)
  // console.log([
  //   {
  //     name: "Revenue",
  //     data: [55, 64, 48, 66, 49, 68, 50],
  //   }
  // ])
  // graphData = [
  //   {
  //     name: "Revenue",
  //     data: [55, 64, 48, 66, 49, 68, 50],
  //   }
  // ]
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
  return graphData ?
    (<Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          {/* <Button
            bg={boxBg}
            fontSize="sm"
            fontWeight="500"
            color={textColorSecondary}
            borderRadius="7px"
          >
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me="4px"
            />
            This month
          </Button> */}
          {/* <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            {...rest}>
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button> */}

        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>

          {/* <Flex align='center'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              On track
            </Text>
          </Flex> */}
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
          <Flex align='center' alignItems='center' w='100%'>
            <Text
              color={textColor}
              fontSize='34px'
              textAlign='start'
              fontWeight='700'
              lineHeight='100%'>
              {coinData.market_data.current_price.usd}
            </Text>
              <Flex align='center' alignItems='center'>
                {/* <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' /> */}
                <Text color='green.500' fontSize='sm' fontWeight='700'>
                  +2.45%
                </Text>
              </Flex>
            <Flex align='center' alignItems='center' mb='20px'>
              <Text
                color='secondaryGray.600'
                fontSize='sm'
                fontWeight='500'
                mt='4px'
                me='12px'>

              </Text>
            </Flex>
          </Flex>
          <LineChart
            chartData={graphData}
            // chartOptions={{
            //   ...options, yaxis: {
            //     min: Math.min(...graphData[0].data),  // Set the minimum value for the y-axis
            //     max: Math.max(...graphData[0].data),  // Set the maximum value for the y-axis (adjust this value according to your data)
            //     show: true,
            //   }
            // }}
            chartOptions={testOptions}
          />
        </Box>
      </Flex>
    </Card >)
    :
    (<></>)
}
