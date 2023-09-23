import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
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
            <TableContainer backgroundColor="white" color="black" borderRadius="15px" marginBottom="2.3em">
            <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th isNumeric>Rank</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Hours</Th>
                  </Tr>
                </Thead>
                <Tbody>
              {data.map((person) => (
                <Tr key={uuidv4()}>
                <Td isNumeric>{data.indexOf(person)+1}</Td>
                <Td>{person.name}</Td>
                <Td isNumeric>{person.hours}</Td>
              </Tr>
              ))}
              </Tbody>
              </Table>
            </TableContainer>
            </Flex>
          </Flex>
        </Center>
      </div>
    );
  }
}
