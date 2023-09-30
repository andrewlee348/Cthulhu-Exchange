import { Box, useStyleConfig, useColorModeValue, Text } from "@chakra-ui/react";
function Card(props) {
  const { variant, children, title, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });

  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box __css={styles} {...rest}>
      {title? (<Text
        mt="45px"
        mb="36px"
        color={textColor}
        fontSize="2xl"
        ms="24px"
        fontWeight="700"
      >
        {title}
      </Text>) : (<></>)}
      {children}
    </Box>
  );
}

export default Card;
