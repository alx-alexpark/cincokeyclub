import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Field, useFormik } from "formik";
import SuggestLogin from "@/components/SuggestLogin";
import LoadingScreen from "@/components/LoadingScreen";
import { Flex, Text } from "@chakra-ui/react";
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

interface User {
  email: string;
  name: string;
}

export default function SubmitHours() {
  const { data: session, status } = useSession();
  const [eventdata, setEventdata] = useState<[]>([]);
  const [userList, setUserList] = useState<[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const formik = useFormik({
    initialValues: {
      hours: 0,
      event: "default",
      email: "default"
    },
    onSubmit: async (values: {
      hours: number;
      event: string;
      email: string;
    }) => {
      const callApi = async () => await axios.post("/api/addAdminHours", values);
      toast.promise(callApi, {
        pending: "Adding hours",
        success: "Yay! Added hours successfully",
        error: "Error. Go yell at Alex.",
      });
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
    axios.get("/api/getEvents?showHidden=true").then((res) => {
      setEventdata(res.data.events);
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
            <Text fontWeight="extrabold">Goofy hours add form</Text>
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
                className="text-black mb-1 rounded-md pl-2 text-md p-2"
              >
                <option value="default">Pick a user</option>
                {userList?.map((user: User) => (
                  <option key={uuidv4()} value={user.email}>
                    {user.name}
                  </option>
                ))}
              </select>
              <label htmlFor="hours" className="mt-2 font-semibold">
                Hours
              </label>
              <input
                type="number"
                id="hours"
                name="hours"
                required
                onChange={formik.handleChange}
                value={formik.values.hours}
                className="text-black rounded-md pl-2 p-2 text-md"
              />
              <label htmlFor="event" className="mt-2 font-semibold">
                Volunteering Event
              </label>
              <select
                name="event"
                id="event"
                onChange={formik.handleChange}
                value={formik.values.event}
                required
                className="text-black mb-3 rounded-md pl-2 text-md p-2"
              >
                <option value="default">Pick an event</option>
                {eventdata?.map((event: Event) => (
                  <option key={uuidv4()} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
              <input
                type="submit"
                style={{ cursor: "pointer" }}
                disabled={formik.isSubmitting}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              />
            </form>
          </main>
        </div>
      </Flex>
    );
  }
  return <SuggestLogin />;
}
