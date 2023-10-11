import { Box, useStyleConfig, useColorModeValue, Text } from "@chakra-ui/react";
function Card(props) {
  const { variant, children, title, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });

  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box __css={styles} {...rest}>
      {title ? (
        <Text
          mt="10px"
          mb="0px"
          color={textColor}
          fontSize="3xl"
          ms="20px"
          fontWeight="500"
        >
          {title}
        </Text>
      ) : (
        <></>
      )}
      <Text mt="20px" ml="10px" mb="5px">
        {children}
      </Text>
    </Box>
  );
}

export default Card;
