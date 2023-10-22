import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import ActionButton from "./ActionButton";
import CachedIcon from "@mui/icons-material/Cached";

const ConvertButton = () => {
  const handleConvert = () => {
    // handle convert logic here
  };

  return (
    <ActionButton
      title="Convert"
      icon={<CachedIcon style={{ color: "white" }} />}
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
          onClick={handleConvert}
        >
          Convert
        </Button>
      </Flex>
    </ActionButton>
  );
};

export default ConvertButton;
