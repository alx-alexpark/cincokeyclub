import { Button, Card, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import SuggestLogin from "@/components/SuggestLogin";

import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface HoursRequest {
  hours: string;
  picture: string;
  eventId: string;
  approved: null;
  user: string;
  userImage: string;
  userEmail: string;
  eventName: string;
  uuid: string;
  comment: string;
}

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Check if the user is an admin
    axios
      .get("/api/isadmin")
      .then((res) => {
        setIsAdmin(res.data.admin);
      })
      .catch((error) => {
        console.error(error);
        setIsAdmin(false);
      });

    // Get pending requests
    axios.get("/api/getPendingHoursRequests").then((res) => {
      setRequests(res.data.pending);
    });
  }, []);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (isAdmin && session) {
    return (
      <Flex flexDirection="column" minH="100vh">
        <Navbar />
        <div
          className="container flex items-center p-4 mx-auto justify-center flex-col h-full"
          style={{ flex: "1" }}
        >
          {/* Show a message when there are no more pending requests */}
          {requests.length == 0 && (
            <h1>There are no more hour submissions for you to process</h1>
          )}

          {/* Show each request as a card */}
          {requests.map((req: HoursRequest) => {
            return (
              <Card key={uuidv4()}>
                <Flex
                  className="flex items-center container flex-col"
                  width="auto"
                  padding="0.5em"
                  borderRadius="1em"
                >
                  <img
                    src={req.picture}
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      maxHeight: "200px",
                      margin: "auto",
                      borderRadius: "0.5em",
                    }}
                  />
                  <p>
                    {req.hours} Hour{parseFloat(req.hours) !== 1 && "s"} @{" "}
                    {req.eventName}
                  </p>
                  <p>Submitted by {req.user}</p>
                  {req.comment?.length != 0 && (
                    <p>User submitted comment: &quot;{req.comment}&quot;</p>
                  )}

                  {/* Approve/deny buttons */}
                  <Flex
                    alignItems="stretch"
                    flexDir="row"
                    justifyContent="stretch"
                    flex="1"
                  >
                    <Button
                      size="md"
                      variant="solid"
                      backgroundColor="#66FF00"
                      onClick={async () => {
                        await axios.post("/api/approveOrDeny", {
                          status: true,
                          id: req.eventId,
                          email: req.userEmail,
                        });
                        setRequests(
                          requests.filter(
                            (r: HoursRequest) => r.uuid != req.uuid,
                          ),
                        );
                      }}
                    >
                      Approve
                    </Button>

                    <Button
                      size="md"
                      variant="solid"
                      backgroundColor="#FF0800"
                      onClick={async () => {
                        await axios.post("/api/approveOrDeny", {
                          status: false,
                          id: req.eventId,
                          email: req.userEmail,
                        });
                        setRequests(
                          requests.filter(
                            (r: HoursRequest) => r.uuid != req.uuid,
                          ),
                        );
                      }}
                    >
                      Deny
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </div>
      </Flex>
    );
  }

  return <SuggestLogin />;
}
