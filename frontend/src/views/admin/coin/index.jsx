import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import TotalSpent from "views/admin/default/components/TotalSpent";
import Chart from "views/admin/default/components/Chart";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

const API_BASE_URL = "http://127.0.0.1:5000";

export default function Marketplace() {
  const url = useLocation().pathname.split("/");
  const coinName = url[url.length - 1];

  const [coinData, setCoinData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [graphInterval, setGraphInterval] = useState("day");
  const [image, setImage] = useState("");
  const [graphPoints, setGraphPoints] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/coins/${coinName}`);
        setCoinData(response.data[0]);
        setGraphData(response.data[1]);
        console.log("api data", response.data[1]);

        // setGraphPoints(graphData.map((p) => p[0]));
        // console.log("graph data: ", response.data);
      } catch (error) {
        console.error("Error fetching coin:", error);
      }
    };
    fetchData();
  }, []);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <div>
      {coinData ? (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
          {/* Main Fields */}
          <Grid
            mb="20px"
            gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
            gap={{ base: "20px", xl: "20px" }}
            display={{ base: "block", xl: "grid" }}
          >
            <Flex
              flexDirection="column"
              gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
            >
              <Flex
                mt="45px"
                mb="20px"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "center" }}
              >
                <img
                  src={coinData.image.large}
                  alt="Logo"
                  width="50px"
                  height="50px"
                />
                <Flex
                  mt="45px"
                  mb="20px"
                  justifyContent="space-between"
                  flexDirection="column"
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "start", md: "center" }}
                >
                  <Text
                    color={textColor}
                    fontSize="2xl"
                    ms="24px"
                    fontWeight="700"
                  >
                    {coinData.name}
                  </Text>
                  <Text
                    color={textColor}
                    fontSize="2xl"
                    ms="24px"
                    fontWeight="700"
                  >
                    {coinData.symbol}
                  </Text>
                </Flex>
              </Flex>

              <Flex direction="column">
                {/* <Flex
                  mt="45px"
                  mb="20px"
                  justifyContent="space-between"
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "start", md: "center" }}
                ></Flex> */}
                <SimpleGrid columns={{ base: 1, md: 1 }} gap="20px">
                  <Chart coinData={coinData} gD={graphData} />
                </SimpleGrid>
                <SimpleGrid
                  columns={{ base: 1, md: 1 }}
                  gap="20px"
                  mb={{ base: "20px", xl: "0px" }}
                >
                  <Card title={`About ${coinData.name}`}>
                    {coinData.description["en"]}
                  </Card>
                </SimpleGrid>
              </Flex>
            </Flex>
            <Flex
              flexDirection="column"
              gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
            ></Flex>
          </Grid>
          {/* Delete Product */}
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
