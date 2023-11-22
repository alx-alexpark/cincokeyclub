import { Center, Flex, Stack, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";

export default function LoadingScreen() {
  return (
    <Flex
      minHeight="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Navbar />
      <Center flex={1} minH="100%">
        <Stack>
          <Text fontSize="4xl">Loading...</Text>
        </Stack>
      </Center>
    </Flex>
  );
}
