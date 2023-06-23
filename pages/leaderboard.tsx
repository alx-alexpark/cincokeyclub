import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

interface LeaderboardEntry {
  name: string;
  hours: number;
  picture: string;
}

export default function Leaderboard() {
  const { data, error, isLoading } = useSWR<LeaderboardEntry[], Error>(
    "/api/leaderboard",
    fetcher
  );
  if (isLoading) return <Center>Loading</Center>;
  if (error) return <Center>Failed to load</Center>;
  if (data) {
    return (
      <div>
        <Center height="100vh" width="100vw">
          <Flex flexDir="column">
            <Text fontSize="3.5em">Leaderboard</Text>
            <Flex alignItems="center" justifyContent="center" flexDir="column">
              {data.map((person) => (
                <Card
                  minWidth="50vw"
                  direction="row"
                  overflow="hidden"
                  variant="outline"
                  marginTop="0.5em"
                  marginBottom="0.5em"
                >
                  <img
                    style={{ objectFit: "cover", maxWidth: "200px" }}
                    src={person.picture}
                    alt="Person's profile picture"
                  />
                  <Stack>
                    <CardBody>
                      <Text fontSize="1.25em" fontWeight="Bold">
                        {person.name}
                      </Text>
                      <Text fontSize="1em">{person.hours} Hours</Text>
                    </CardBody>
                  </Stack>
                </Card>
              ))}
            </Flex>
          </Flex>
        </Center>
      </div>
    );
  }
}
