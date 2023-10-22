import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import ActionButton from "./ActionButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const SellButton = () => {
  const handleSell = () => {
    // handle sell logic here
  };

  return (
    <ActionButton
      title="Sell"
      icon={<AttachMoneyIcon style={{ color: "white" }} />}
    >
      <Flex direction="column">
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
