import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./auth/[...nextauth]";
import clientPromise from "@/lib/mongodb";
import getEventNameById from "@/util/getEventNameById";

export default async function myEvents(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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

    // Get session details
    const userEmail = session.user?.email;
    const selUser = await db.collection("users").findOne({ email: userEmail });

    // Use event IDs to set the event names
    let userEvents = selUser?.events;
    for (let i = 0; i < userEvents.length; i++) {
      userEvents[i].eventName = await getEventNameById(userEvents[i].eventId);
    }

    // Return the events
    res.json({ events: selUser?.events });
  } catch (e) {
    res.json({ error: e });
  }
}
