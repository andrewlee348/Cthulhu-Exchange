import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { columnsDataColumns } from "views/admin/dataTables/variables/columnsData";
// import { column } from "stylis";

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
    Header: "Change (24h)",
    accessor: "change",
  },
  {
    Header: "Market cap",
    accessor: "marketCap",
  },
];

const mockData = [
  {
    asset: "PEPE",
    change: 2458,
    marketCap: "12.Jan.2021",
    price: 75.5,
  },
  {
    asset: "Venus DB PRO",
    change: 1485,
    marketCap: "21.Feb.2021",
    price: 35.4,
  },
  {
    asset: "Venus DS",
    change: 1024,
    marketCap: "13.Mar.2021",
    price: 25,
  },
  {
    asset: "Venus 3D Asset",
    change: 858,
    marketCap: "24.Jan.2021",
    price: 100,
  },
];

const API_BASE_URL = "http://127.0.0.1:5000";

export default function Settings() {
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get_allcrypto`);
        const formattedData = response.data.map((rawData) => ({
          asset: rawData.symbol.toUpperCase(),
          change:
            parseFloat(rawData.price_change_percentage_24h).toFixed(2) + "%",
          marketCap: "$ " + rawData.market_cap.toLocaleString(),
          price: "$ " + parseFloat(rawData.current_price).toLocaleString(),
          id: rawData.id,
          image: rawData.image,
        }));
        setCryptoData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Error fetching get_allcrypto:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ColumnsTable columnsData={colassets} tableData={cryptoData} />
      </SimpleGrid>
    </Box>
  );
}
