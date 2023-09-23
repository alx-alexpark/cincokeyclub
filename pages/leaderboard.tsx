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
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";

const fetcher = (args: any) => fetch(args).then((res) => res.json());

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
  if (isLoading) return <LoadingScreen />;
  if (error) return <Center height="100vh" width="100vw">Failed to load</Center>;
  if (data) {
    console.log(data);
    return (
      <div className="min-h-screen">
        <Navbar />
        <Center width="100vw" minH="100%">
          <Flex flexDir="column" minH="100%">
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
                  key={uuidv4()}
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
