import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { v4 as uuidv4 } from "uuid";

import { authOptions } from "./auth/[...nextauth]";

const s3 = new S3({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  accessKeyId: process.env.CLOUDFLARE_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY,
  signatureVersion: "v4",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Get request parameters
  let { name, type } = req.body;

  // Get session
  const session = await getServerSession(req, res, authOptions);

  // Deny access if no session is active
  if (!session) {
    return res
      .status(403)
      .json({ message: "Access denied: What are you doing???" });
  }

  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Reject files that don't have an 'image/' mimetype
  if (!type.startsWith("image/")) {
    return res.status(500).json({
      error:
        "Only images are allowed. What shenanigans are you trying to pull??",
    });
  }

  let filenameParts = name.split(".");
  let newName = uuidv4() + "." + filenameParts[filenameParts - 1];

  try {
    // Get URL for upload
    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: newName,
      Expires: 120,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    // Return details about URL
    res.status(200).json({ url: url, filename: newName });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      // Maximum file size allowed
      sizeLimit: "8mb",
    },
  },
};
