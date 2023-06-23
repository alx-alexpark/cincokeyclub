import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface HoursRequest {
  hours: string;
  picture: string;
  eventId: string;
  approved: null;
  user: string;
  userImage: string;
  userEmail: string;
}

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/isadmin")
      .then((res) => {
        setIsAdmin(res.data.admin);
      })
      .catch((error) => {
        console.error(error);
        setIsAdmin(false);
      });

    axios.get("/api/getPendingHoursRequests").then((res) => {
      setRequests(res.data.pending);
    });
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (isAdmin && session) {
    return (
      <main className="container flex items-center p-4 mx-auto min-h-screen justify-center flex-col">
        {requests.map((req: HoursRequest) => (
          <Flex
            className="flex items-center container flex-col"
            border="0.5em solid blue"
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
            <p>{req.hours} Hours</p>
            <br />
            <p>Submitted by {req.user}</p>
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
                    status: "deny",
                    id: req.eventId,
                    email: req.userEmail,
                  });
                }}
              >
                Deny
              </Button>
            </Flex>
          </Flex>
        ))}
      </main>
    );
  }

  return (
    <>
      <h1>Access Denied</h1>
    </>
  );
}