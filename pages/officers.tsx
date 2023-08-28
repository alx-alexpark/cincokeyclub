import OfficerCard from "@/components/OfficerCard";
import { Flex, Text } from "@chakra-ui/react";

export default function OfficersPage() {
  return (
    <main>
      <Flex
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        backgroundAttachment="fixed"
      >
        <Text fontSize="5rem">Officers</Text>
        <Flex
          flexDir="row"
          gap="1em"
          minWidth="85vw"
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          <OfficerCard
            name="Christian Deunas"
            photoSrc="/officerPhotos/christian.jpg"
            position="Historian"
            desc="Hello! I'll be a senior entering the 2023 - 2024 school year as the historian for Key Club.  I'm very tired."
          />
          <OfficerCard
            name="Christian Deunas"
            photoSrc="/officerPhotos/christian.jpg"
            position="Historian"
            desc="Hello! I'll be a senior entering the 2023 - 2024 school year as the historian for Key Club.  I'm very tired."
          />
          <OfficerCard
            name="Christian Deunas"
            photoSrc="/officerPhotos/christian.jpg"
            position="Historian"
            desc="Hello! I'll be a senior entering the 2023 - 2024 school year as the historian for Key Club.  I'm very tired."
          />
          <OfficerCard
            name="Christian Deunas"
            photoSrc="/officerPhotos/christian.jpg"
            position="Historian"
            desc="Hello! I'll be a senior entering the 2023 - 2024 school year as the historian for Key Club.  I'm very tired."
          />
        </Flex>
      </Flex>
    </main>
  );
}
