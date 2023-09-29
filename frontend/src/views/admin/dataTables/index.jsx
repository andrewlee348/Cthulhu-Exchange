import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import { columnsDataColumns } from "views/admin/dataTables/variables/columnsData";
import React from "react";
import { column } from "stylis";

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

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ColumnsTable columnsData={colassets} tableData={mockData} />
      </SimpleGrid>
    </Box>
  );
}
