import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Field, useFormik } from "formik";

const BUCKET_URL = "https://cdn.funny-bunny.ninja/";

export default function SubmitHours() {
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();
  const { data: session } = useSession();
  const formik = useFormik({
    initialValues: {
      hours: 0,
      event: "Pick an event",
      image: null
    },
    onSubmit: async (values: { hours: number; event: string; image: any }) => {
      const actuallySentData = structuredClone(values);
      actuallySentData.image = uploadedFile;
      await axios.post("/api/hours", actuallySentData);
      alert(JSON.stringify(actuallySentData, null, 2));
    },
  });
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let randomFileName = uuidv4();

    let { data } = await axios.post("/api/file", {
      name: randomFileName + "." + file.name.split(".")[1],
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

    setUploadedFile(
      BUCKET_URL + randomFileName + "." + file.name.split(".")[1]
    );
    setFile(null);
  };

  if (session) {
    return (
      <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
        <main>
          <p>Please select a file to upload</p>
          <input type="file" onChange={(e) => selectFile(e)} accept="image/*" />
          {file && (
            <>
              <p>Selected file: {file.name}</p>
              <button
                onClick={uploadFile}
                className="bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
              >
                Upload a File!
              </button>
            </>
          )}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="hours">Hours</label>
            <input type="text" id="hours" name="hours" onChange={formik.handleChange} value={formik.values.hours} className="text-black" />
            <label htmlFor="event">Volunteering Event</label>
            <select
              name="event"
              id="event"
              onChange={formik.handleChange}
              value={formik.values.event}
              className="text-black"
            >
              <option value="katymarathon">Katy Marathon</option>
              <option value="ballardhouse">Ballard House</option>
              <option value="turkeydash">Turkey Dash</option>
            </select>
            <input type="submit" />
          </form>
          {uploadingStatus && <p>{uploadingStatus}</p>}
          {uploadedFile && (
            <Image
              alt="User uploaded volunteer picture"
              src={uploadedFile}
              height={512}
              width={512}
            />
          )}
        </main>
      </div>
    );
  }
    return <h1>Login required</h1>;
  
}
