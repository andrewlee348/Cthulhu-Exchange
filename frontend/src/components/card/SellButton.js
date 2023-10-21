import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import ActionButton from "./ActionButton";
import { FaDollarSign } from "react-icons/fa";
const SellButton = () => {
  const handleSell = () => {
    // handle sell logic here
  };

  return (
    <ActionButton title="Sell" icon={<FaDollarSign color="white" />}>
      <Flex direction="column">
        skrrrat
        <Button
          variant="darkBrand"
          color="white"
          fontSize="sm"
          fontWeight="500"
          borderRadius="70px"
          px="16px"
          py="5px"
          ml="10px"
          onClick={handleSell}
        >
          Sell
        </Button>
      </Flex>
    </ActionButton>
  );
};

export default SellButton;
