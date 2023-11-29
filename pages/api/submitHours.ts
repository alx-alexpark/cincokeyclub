import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { v4 as uuidv4 } from "uuid";

import clientPromise from "@/lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function submitHours(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get request parameters
  const { hours, image, event, comment } = req.body;

  // Get session
  const session = await getServerSession(req, res, authOptions);

  // Deny access if no session is active
  if (!session) {
    return res.status(403).json({
      error: "Not authenticated",
    });
  }

  // Initialize DOMPurify
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  // Get client details
  const client = await clientPromise;
  const db = client.db("auth");

  // Add event to the user's database
  const users = db.collection("users");
  await users.updateOne(
    { email: session?.user?.email },
    {
      $push: {
        events: {
          hours: parseFloat(hours),
          picture: image,
          eventId: event,
          approved: null,
          user: session?.user?.name,
          userImage: session?.user?.image,
          userEmail: session?.user?.email,
          comment: comment ? purify.sanitize(comment) : "",
          uuid: uuidv4(),
        },
      },
    },
  );

  // Redirect user to the hours page
  res.redirect(302, "/myHours");
}
