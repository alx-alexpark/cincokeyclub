import { Flex, HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import SuggestLogin from "@/components/SuggestLogin";

import "react-toastify/dist/ReactToastify.css";

export default function GeneralMeeting() {
  const { data: session, status } = useSession();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validateOnMount: true,
    validate: (values: { code: string }) => {
      const errors: { code?: string } = {};

      if (!values.code) {
        errors.code = "Required";
      } else if (values.code.length != 6) {
        errors.code = "Code must be 6 digits long";
      }

      return errors;
    },
    onSubmit: async (values: { code: string }) => {
      const callApi = async () => await axios.post("/api/gm", values);
      toast.promise(callApi, {
        pending: "Processing...",
        success: "Received hours",
        error: "Code invalid or hours already claimed",
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
              background: "transparent",
            }}
          >
            <ToastContainer />

            <form
              onSubmit={(e) => {
                formik.handleSubmit(e);
              }}
              className="flex flex-col gap-4"
            >
              <label htmlFor="code" className="mt-2 font-semibold">
                Enter the 6 digit code
                <HStack>
                  <PinInput
                    id="code"
                    onChange={(code: string) => {
                      formik.setFieldValue("code", code);
                    }}
                  >
                    <PinInputField textColor="black" bg="white" />
                    <PinInputField textColor="black" bg="white" />
                    <PinInputField textColor="black" bg="white" />
                    <PinInputField textColor="black" bg="white" />
                    <PinInputField textColor="black" bg="white" />
                    <PinInputField textColor="black" bg="white" />
                  </PinInput>
                </HStack>
              </label>

              <button
                type="submit"
                style={{ cursor: "pointer" }}
                disabled={!formik.isValid || formik.isSubmitting}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-300 disabled:text-gray-500"
              >
                Submit
              </button>
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


