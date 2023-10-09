import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Field, useFormik } from "formik";
import SuggestLogin from "@/components/SuggestLogin";
import LoadingScreen from "@/components/LoadingScreen";
import { Flex, Text } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateName() {
  const { data: session, status } = useSession();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values: { name: string }) => {
      const callApi = async () => await axios.post("/api/name", values);
      toast.promise(callApi, {
        pending: "Applying change",
        success: "Name updated!",
        error: "Error. Contact us on remind.",
      });
    },
  });

  if (session) {
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
            <form
              onSubmit={(e) => {
                formik.handleSubmit(e);
              }}
              className="flex flex-col"
            >
              <label htmlFor="name" className="mt-2 font-semibold">
                Enter your <b>real</b> name.
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={session?.user?.name ?? "You found a glitch!"}
                onChange={formik.handleChange}
                value={formik.values.name}
                className="text-black rounded-md pl-2 p-2 text-md mb-2"
              />
              <input
                type="submit"
                style={{ cursor: "pointer" }}
                disabled={formik.isSubmitting}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                value="update"
              />
            </form>
          </main>
        </div>
      </Flex>
    );
  } else if (status == "loading") {
    return <LoadingScreen />;
  }
  return <SuggestLogin />;
}
