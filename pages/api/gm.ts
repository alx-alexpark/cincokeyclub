import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { v4 as uuidv4 } from "uuid";

import clientPromise from "@/lib/mongodb";
import UserSubmittedEvent from "@/models/UserSubmittedEvent";
import { authOptions } from "./auth/[...nextauth]";

export default async function generalMeeting(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get session
  const session = await getServerSession(req, res, authOptions);

  // Deny access if no session is active
  if (!session) {
    return res.status(403).json({
      error: "Not authenticated",
    });
  }

  // Get request parameters
  const { code } = req.body;

  // Get client details
  const client = await clientPromise;
  const db = client.db("auth");

  // Fetch users and events
  const users = db.collection("users");
  const events = await db.collection("events").find().toArray();

  // Find a matching event
  let event = events.find((event) => event.code == parseInt(String(code)));
  if (!event) {
    return res.status(500).json({ error: "invalid code" });
  }

  // Get the event id of the event
  let eventId = event.id;
  console.log(eventId);

  // Get session user
  const you = await db
    .collection("users")
    .findOne({ email: session?.user?.email });

  // Stop if the user has already gotten hours for this general meeting
  if (you?.events !== undefined) {
    const userEvents = you?.events as UserSubmittedEvent[];

    let userEvent = userEvents.find((e) => e.eventId == eventId);
    console.log(userEvent);

    if (userEvent) {
      console.log("ur sus");
      return res.status(420).json({
        error: "You already have gotten the hours for this meeting",
      });
    }
  }

  // Add event to the user's events
  await users.updateOne(
    { email: session?.user?.email },
    {
      $push: {
        events: {
          hours: 0.5,
          picture: "",
          eventId: eventId,
          approved: true,
          user: session?.user?.name,
          userImage: session?.user?.image,
          userEmail: session?.user?.email,
          comment: "",
          uuid: uuidv4(),
        },
      },
    },
  );

  res.status(200).json({ message: "Added hours for GM" });
}
