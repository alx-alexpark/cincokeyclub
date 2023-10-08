import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import SuggestLogin from "@/components/SuggestLogin";
import LoadingScreen from "@/components/LoadingScreen";
import {
  Card,
  CardBody,
  Flex,
  HStack,
  StackDivider,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Event {
  hours: number;
  picture: String;
  userImage: String;
  approved: boolean;
  user: String;
  userEmail: String;
  eventId: String;
  eventName: String;
}

export default function MyHours() {
  const { data: session, status } = useSession();
  const [totalHours, setTotalHours] = useState(0);
  const [events, setHours] = useState([]);

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
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >

            <Text fontSize="1.5rem">Events you have attended</Text>
            <TableContainer backgroundColor="white" color="black" borderRadius="15px" maxWidth="100vw">
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Event name</Th>
                    <Th isNumeric>Hours</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {events != undefined ? (
                    events.map((event: Event) => {
                      return (
                        <Tr key={uuidv4()}>
                          <Td overflowX="hidden" textOverflow="ellipsis">{event.eventName}</Td>
                          <Td isNumeric>{event.hours}</Td>
                          <Td>{event.approved == null ? "Pending" : event.approved == true ? "Approved" : "Denied"}</Td>
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
