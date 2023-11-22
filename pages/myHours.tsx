import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import SuggestLogin from "@/components/SuggestLogin";
import UserSubmittedEvent from "@/models/UserSubmittedEvent";

export default function MyHours() {
  const { data: session, status } = useSession();
  const [totalHours, setTotalHours] = useState(0);
  const [events, setHours] = useState([]);
  let tableSize = useBreakpointValue({ base: "sm", md: "md" });

  useEffect(() => {
    axios
      .get("/api/hours")
      .then((res) => {
        setTotalHours(res.data.hours ?? 0);
      })
      .catch((error) => {
        console.error(error);
        setTotalHours(-1);
      });
    axios.get("/api/myEvents").then((res) => {
      console.log(res.data.events);
      setHours(res.data.events);
    });
  }, []);

  if (session) {
    return (
      <Flex className="min-h-screen" flexDir="column">
        <Navbar />
        <div className="container flex items-center p-4 mx-auto justify-center flex-col flex-1">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="100%"
          >
            <Text fontSize="4rem" fontWeight="extrabold">
              {totalHours}
            </Text>
            <Text fontSize="1.25rem">Your total hours</Text>
          </Flex>
          <br />
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="1.5rem">Events you have attended</Text>
            <TableContainer
              backgroundColor="white"
              color="black"
              borderRadius="15px"
              overflowX="hidden"
            >
              <Table
                variant="striped"
                colorScheme="teal"
                style={{ tableLayout: "auto" }}
                size={tableSize}
              >
                <Thead>
                  <Tr>
                    <Th>Event name</Th>
                    <Th isNumeric>Hours</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {events != undefined ? (
                    events.map((event: UserSubmittedEvent) => {
                      return (
                        <Tr key={uuidv4()}>
                          <Td textOverflow="ellipsis" overflowX="hidden">
                            {event.eventName}
                          </Td>
                          <Td isNumeric>{event.hours}</Td>
                          <Td>
                            {event.approved == null
                              ? "Pending"
                              : event.approved
                              ? "Approved"
                              : "Denied"}
                          </Td>
                        </Tr>
                      );
                    })
                  ) : (
                    <Tr>
                      <Td>*</Td>
                      <Td>*</Td>
                      <Td>*</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </div>
      </Flex>
    );
  } else if (status == "loading") {
    return <LoadingScreen />;
  }
  return <SuggestLogin />;
}
