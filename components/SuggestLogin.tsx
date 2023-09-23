import { Container, Text, Center, Stack, Button, Flex } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Navbar from "./Navbar";

export default function SuggestLogin() {
  return (
    <Flex flexDir="column" minHeight="100vh">
      <Navbar />
    <Container
      flex="1"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Center>
        <Stack>
          <Text fontSize="4xl">Auth required</Text>
          <Button onClick={() => signIn("google")}>Sign in</Button>
          <Text cursor="pointer" onClick={() => window.history.back()}><u>Go back?</u></Text>
        </Stack>
      </Center>
    </Container>
    </Flex>
  );
}
