import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useHistory } from "react-router-dom";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;

  const [hoveredRow, setHoveredRow] = useState(null);
  const history = useHistory();
  const handleRowHover = (index) => {
    setHoveredRow(index);
  };
  const handleRowMouseLeave = () => {
    setHoveredRow(null);
  };

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 100;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={index}
                onClick={() => history.push("/admin/coin/" + row.original.id)}
                onMouseEnter={() => handleRowHover(index)}
                onMouseLeave={handleRowMouseLeave}
                style={{
                  backgroundColor:
                    hoveredRow === index ? "#FFF5C8" : "transparent",
                  cursor: "pointer",
                }}
              >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Asset") {
                    data = (
                      <Flex align="center">
                        <img
                          src={row.original.image}
                          alt={row.original.id}
                          style={{ width: "40px", height: "40px" }}
                        />
                        <row>
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                            ml="13px"
                          >
                            {row.original.id.replaceAll("-", " ").toUpperCase()}
                            {/* {cell.value} */}
                          </Text>
                          <Text
                            color={"rgb(150, 150, 150)"}
                            fontSize="sm"
                            fontWeight="500"
                            ml="13px"
                          >
                            {/* {row.original.id.replaceAll("-", " ").toUpperCase()} */}
                            {cell.value.toUpperCase()}
                          </Text>
                        </row>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Price") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={"rgb(130,130,130)"}
                          fontSize="16px"
                          fontWeight="500"
                        >
                          $ {cell.value.toFixed(2).toLocaleString()}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Change (24h)") {
                    data = (
                      <Text
                        color={
                          parseFloat(cell.value) >= 0 ? "#008000" : "#d33854"
                        }
                        fontSize="sm"
                        fontWeight="700"
                      >
                        {parseFloat(cell.value) >= 0 ? "▲" : "▼"}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {Math.abs(parseFloat(cell.value))}%
                      </Text>
                    );
                  } else if (cell.column.Header === "Balance") {
                    data = (
                      <row>
                        <Text
                          color={textColor}
                          fontSize="16px"
                          fontWeight="450"
                        >
                          ${" "}
                          {row.original.balance_cash
                            .toFixed(2)
                            .toLocaleString()}
                        </Text>
                        <Text
                          color={"rgb(130,130,130)"}
                          fontSize="sm"
                          fontWeight="500"
                        >
                          {cell.value.toFixed(5).toLocaleString()}{" "}
                          {row.original.asset.toUpperCase()}
                        </Text>
                      </row>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
