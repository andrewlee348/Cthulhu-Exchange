import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import ActionButton from "./ActionButton";
import VerticalAlignTopOutlinedIcon from "@mui/icons-material/VerticalAlignTopOutlined";

const WithdrawButton = () => {
  const handleWithdraw = () => {
    // handle withdraw logic here
  };

  return (
    <ActionButton
      title="Withdraw"
      icon={<VerticalAlignTopOutlinedIcon style={{ color: "white" }} />}
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
          onClick={handleWithdraw}
        >
          Withdraw
        </Button>
      </Flex>
    </ActionButton>
  );
};

export default WithdrawButton;
