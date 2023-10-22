import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import ActionButton from "./ActionButton";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";

const DepositButton = () => {
  const handleDeposit = () => {
    // handle deposit logic here
  };

  return (
    <ActionButton
      title="Deposit"
      icon={<VerticalAlignBottomOutlinedIcon style={{ color: "white" }} />}
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
          onClick={handleDeposit}
        >
          Deposit
        </Button>
      </Flex>
    </ActionButton>
  );
};

export default DepositButton;
