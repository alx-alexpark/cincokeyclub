import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/lib/mongodb";
import Event from "@/models/Event";

export default async function approveOrDeny(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get request parameters
  const { email, id, status } = req.body;

  // Get session
  const session = await getServerSession(req, res, authOptions);

  // Deny access if no session is active
  if (!session) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  try {
    // Get client details
    const client = await clientPromise;
    const db = client.db("auth");

    // Get request and target users
    const user = await db.collection("users").findOne({ email: email });
    const initiatingUser = await db
      .collection("users")
      .findOne({ email: session.user?.email });

    // Deny access if the user is not an admin
    if (!initiatingUser?.admin) {
      res.status(403).json({
        message: "bruh what are you doing trying to call internal api routes??",
      });
    }

    // Approve events with the matching ID
    user?.events.forEach((event: Event) => {
      if (event.eventId === id) {
        event.approved = status;
        console.log(event.eventId);
      }
    });

    // Update user events in the database
    await db
      .collection("users")
      .updateOne({ email: email }, { $set: { events: user?.events } });

    res.json({ message: "success" });
  } catch (e) {
    res.json({ error: e });
  }
}
