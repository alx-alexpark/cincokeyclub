
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export type DriveFile = {
  kind: string;
  id: string;
  name: string;
  mimeType: "image/jpeg";
};

export type Data = {
  files: DriveFile[];
};

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.PICS_CLIENT_ID ?? "sus",
    process.env.PICS_CLIENT_SECRET ?? "sus",
    REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.PICS_REFRESH_TOKEN
  });

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
    params: {
      q: `mimeType = 'image/png' or mimeType = 'image/jpeg'`,
    },
  });

  const response = await drive.files.list()

  res.status(200).json({ files: response.data.files as DriveFile[] });
}