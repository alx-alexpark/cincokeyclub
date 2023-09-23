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
      <div className="min-h-screen"><Navbar />
      <div className="container flex items-center p-4 mx-auto justify-center flex-col" style={{minHeight: "100%"}}>
        
       
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
            <br />
            <Text fontSize="1.5rem">Events you have attended</Text>
            {events != undefined ? events.map((event: Event) => {
              // const nameResponse = axios.get(`/api/getEventNameById?eventId=${event.eventId}`)
              return (<Card direction={{ base: "column", sm: "row" }} key={uuidv4()}>
                <CardBody>
                  <HStack
                    align="stretch"
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={2}
                  >
                    <Text>{event.eventName}</Text>
                    <Text>{event.hours} Hours</Text>
                    <Text>{event.approved == null ? "Pending" : event.approved == true ? "Approved" : "Denied"}</Text>
                  </HStack>
                </CardBody>
              </Card>
              )
            }) : <h1>You have not submitted any hours yet</h1>}
          </Flex>
      </div>
      </div>
    );
  } else if (status == "loading") {
    return <LoadingScreen />;
  }
  return <SuggestLogin />;
}
