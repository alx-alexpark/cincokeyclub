import { Container, Text, Center, Stack, Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function SuggestLogin() {
  return (
    <Container
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Center>
        <Stack>
          <Text fontSize="4xl">Access Denied</Text>
          <Button onClick={() => signIn()}>Sign in</Button>
        </Stack>
      </Center>
    </Container>
  );
}
