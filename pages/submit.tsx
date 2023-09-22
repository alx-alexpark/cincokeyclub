import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Field, useFormik } from "formik";
import SuggestLogin from "@/components/SuggestLogin";
import LoadingScreen from "@/components/LoadingScreen";
import styles from "../styles/SubmitHours.module.css";
import { Text } from "@chakra-ui/react";
import Link from "next/link";

const BUCKET_URL = "https://cdn.usercontent.cincokey.club/";

interface Event {
  _id: string;
  id: string;
  name: string;
  createdBy: string;
  dateCreated: number;
}

export default function SubmitHours() {
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>(undefined);
  const { data: session, status } = useSession();
  const [eventdata, setEventdata] = useState<[]>([]);

  const formik = useFormik({
    initialValues: {
      hours: 0,
      event: "default",
      image: null,
      comment: ""
    },
    onSubmit: async (values: { hours: number; event: string; image: any; comment: string; }) => {
      const actuallySentData = structuredClone(values);
      actuallySentData.image = uploadedFile;
      await axios.post("/api/submitHours", actuallySentData);
      // alert(JSON.stringify(actuallySentData, null, 2));
    },
  });
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    axios.get("/api/getEvents").then((res) => {
      setEventdata(res.data.events);
      console.log(res.data.events);
    });
  }, []);

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to our servers");

    let { data } = await axios.post("/api/getPresignedURL", {
      name: file.name,
      type: file.type,
    });

    console.log(data);

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(BUCKET_URL + data.filename);
    setFile(null);
    setUploadingStatus("File uploaded successfully");
  };

  if (session) {
    return (
      <div className="container flex items-center p-4 mx-auto min-h-screen justify-center flex-col">
        <main
          style={{ backgroundColor: "transparent", background: "transparent" }}
        >
          <p className="font-semibold">Upload a picture of you volunteering.<br/>Make sure it includes your face!</p>

          <input
            type="file"
            onChange={(e) => selectFile(e)}
            accept="image/*"
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 m-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            style={{ color: "white" }}
          />

          {file && (
            <>
              <p>Selected file: {file.name}</p>
              <button
                onClick={uploadFile}
                className={
                  styles.flash +
                  " bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
                }
              >
                Confirm upload
              </button>
            </>
          )}
          {uploadingStatus && <p>{uploadingStatus}</p>}
          {uploadedFile && (
            <Image
              alt="User uploaded volunteer picture"
              src={uploadedFile}
              height={128}
              width={128}
            />
          )}
          <form onSubmit={(e) => {
            formik.handleSubmit(e);
            window.location.replace("myHours");
          }} className="flex flex-col">
            <label htmlFor="hours" className="mt-2 font-semibold">
              Hours
            </label>
            <input
              type="text"
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
              className="text-black mb-1 rounded-md pl-2 text-md p-2"
            >
              <option value="default">Pick an event</option>
              {eventdata?.map((event: Event) => (
                <option key={uuidv4()} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
            <label htmlFor="comment" className="mt-2 font-semibold">
              Extra Info (Optional)
            </label>
            <input
              placeholder="Anything else you want us to know."
              type="text"
              id="comment"
              name="comment"
              onChange={formik.handleChange}
              value={formik.values.comment}

              className="text-black rounded-md pl-2 p-2 mb-3 text-md"
            />
            <input
              type="submit"
              disabled={uploadedFile == undefined || formik.isSubmitting}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            />
          </form>
          <Link href="/myHours">
            <Text fontWeight="bold" fontSize="1.25rem">
              <u>See your previous hours</u>
            </Text>
          </Link>
        </main>
      </div>
    );
  } else if (status == "loading") {
    return <LoadingScreen />;
  }
  return <SuggestLogin />;
}
