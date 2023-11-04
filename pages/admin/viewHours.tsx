import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Field, useFormik } from "formik";
import SuggestLogin from "@/components/SuggestLogin";
import LoadingScreen from "@/components/LoadingScreen";
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Event {
  _id: string;
  id: string;
  name: string;
  createdBy: string;
  dateCreated: number;
}

interface UserSubmittedEvent {
    hours: number;
    picture: String;
    userImage: String;
    approved: boolean;
    user: String;
    userEmail: String;
    eventId: String;
    eventName: String;
  }

interface User {
  email: string;
  name: string;
}

export default function ViewHours() {
  const { data: session, status } = useSession();
  const [eventdata, setEventdata] = useState<[]>([]);
  const [userList, setUserList] = useState<[]>([]);
  const [currentUserEvents, setCurrentUserEvents] = useState<UserSubmittedEvent[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  let tableSize = useBreakpointValue({ base: "sm", md: "md" });

  const formik = useFormik({
    initialValues: {
      email: "default"
    },
    onSubmit: async (values: {
      email: string;
    }) => {
        const resp = await axios.get(`/api/myEvents?lookupEmail=${values.email}`);
        if (resp.data.events != undefined) {
            setCurrentUserEvents(resp.data.events);
        } else {
            setCurrentUserEvents([]);
            toast.warn('User has not submitted any hours!', {
                position: "top-right",
                autoClose: 7500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        console.log('sussy');
    },
  });

  useEffect(() => {
    axios
      .get("/api/isadmin")
      .then((res) => {
        setIsAdmin(res.data.admin);
      })
      .catch((error) => {
        console.error(error);
        setIsAdmin(false);
      });
    axios.get("/api/getUsers").then((res) => {
      setUserList(res.data.users);
      console.log(res.data.users);
    });
  }, []);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (isAdmin && session) {
    return (
      <Flex minH="100vh" flexDir="column">
        <Navbar />
        <div className="container flex items-center p-4 mx-auto flex-1 justify-center flex-col">
          <main
            style={{
              backgroundColor: "transparent",
              background: "transparent",
            }}
          >
            <ToastContainer />
            <Text fontWeight="extrabold" fontSize="1.2rem">View hours of someone</Text>
            <form
              onSubmit={(e) => {
                formik.handleSubmit(e);
              }}
              className="flex flex-col"
            >
              <label htmlFor="email" className="mt-2 font-semibold">
                User
              </label>
              <select
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
                className="text-black mb-3 rounded-md pl-2 text-md p-2"
              >
                <option value="default">Pick a user</option>
                {userList?.map((user: User) => (
                  <option key={uuidv4()} value={user.email}>
                    {user.name}
                  </option>
                ))}
              </select>
              <input
                type="submit"
                value="View"
                style={{ cursor: "pointer" }}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              />
            </form>
            <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="100%"
          >
            {/* <Text fontSize="4rem" fontWeight="extrabold">
              {totalHours}
            </Text>
            <Text fontSize="1.25rem">Your total hours</Text> */}
          </Flex>
          <br />
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >

            <Text fontSize="1.25rem">Hours submitted by <u>{currentUserEvents.length > 0 ? currentUserEvents[0].user : "..."}</u></Text>
            <TableContainer backgroundColor="white" color="black" borderRadius="15px" overflowX="hidden">
              <Table variant="striped" colorScheme="teal" style={{tableLayout: "auto"}} size={tableSize}>
                <Thead>
                  <Tr>
                    <Th>Event name</Th>
                    <Th isNumeric>Hours</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentUserEvents.length > 0 ? (
                    currentUserEvents.map((event: UserSubmittedEvent) => (
                        <Tr key={uuidv4()}>
                            <Td textOverflow="ellipsis" overflowX="hidden">{event.eventName}</Td>
                            <Td isNumeric>{event.hours}</Td>
                            <Td>{event.approved == null ? "Pending" : event.approved == true ? "Approved" : "Denied"}</Td>
                        </Tr>
                    ))
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
          </main>
        </div>
      </Flex>
    );
  }
  return <SuggestLogin />;
}
