import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import getEventNameById from "@/util/getEventNameById";
import UserSubmittedEvent from "@/models/UserSubmittedEvent";

export default async function getPendingHoursRequests(
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

  // Get client details
  const client = await clientPromise;
  const db = client.db("auth");

  // Filter through ever user and find pending hours
  const users = await db.collection("users").find().toArray();
  let pendingHours: UserSubmittedEvent[] = [];

  users.forEach((user) => {
    if (user.events === undefined) {
      return;
    }

    user.events.forEach(async (event: UserSubmittedEvent) => {
      if (event.approved === null) {
        pendingHours.push(event);
      }
    });
  });

  // Use event IDs to set event names
  for (let i = 0; i < pendingHours.length; i++) {
    pendingHours[i].eventName = await getEventNameById(pendingHours[i].eventId);
  }

  res.json({ pending: pendingHours });
}
