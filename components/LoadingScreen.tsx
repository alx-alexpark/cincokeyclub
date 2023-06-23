import { Container, Text, Center, Stack, Button } from "@chakra-ui/react";

export default function LoadingScreen() {
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
          <Text fontSize="4xl">Loading...</Text>
        </Stack>
      </Center>
    </Container>
  );
}
