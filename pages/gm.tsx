import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Field, useFormik } from "formik";
import SuggestLogin from "@/components/SuggestLogin";
import LoadingScreen from "@/components/LoadingScreen";
import styles from "../styles/SubmitHours.module.css";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function GeneralMeeting() {
  const { data: session, status } = useSession();

  const formik = useFormik({
    initialValues: {
        code: ""
    },
    onSubmit: async (values: {
        code: string;
    }) => {
       const callApi = async () => await axios.post("/api/gm", values); 
       toast.promise(
        callApi,
        {
          pending: 'Working',
          success: 'It worked!!',
          error: 'Code invalid or hours already claimed'
        }
    )
     
    },
  });
  
  if (session) {
    return (
      <Flex minH="100vh" flexDir="column">
        <Navbar />
      <div className="container flex items-center p-4 mx-auto flex-1 justify-center flex-col">
        
        <main
          style={{ backgroundColor: "transparent", background: "transparent",}}
        >

        <ToastContainer />

          <form
            onSubmit={(e) => {
              formik.handleSubmit(e);
            }}
            className="flex flex-col"
          >
            <label htmlFor="code" className="mt-2 font-semibold">
              Enter the 6 digit code
            </label>
            <input
              type="number"
              id="code"
              name="code"
              maxLength={4}
              required
              onChange={formik.handleChange}
              value={formik.values.code}
              className="text-black rounded-md pl-2 p-2 text-md mb-2"
            />
            <input
              type="submit"
              style={{cursor: "pointer"}}
              disabled={formik.values.code == "0" || formik.isSubmitting}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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
