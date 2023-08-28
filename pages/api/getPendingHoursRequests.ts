import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb";
import getEventNameById from "@/util/getEventNameById";

interface Event {
    image: string, hours: number, eventId: string, approved: null | boolean, eventName: string;
}

export default async function getPendingHoursRequests(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const client = await clientPromise;
    const db = client.db("auth");
    const users = await db.collection("users").find().toArray();
    let pendingHours: Event[] = [];
    users.forEach((user) => {
      if (user.events != undefined) {
        user.events.forEach(async (event: Event) => {
            if (event.approved === null) {
                pendingHours.push(event);
            }
        });
      }
    });
    for (let i = 0; i < pendingHours.length; i++) {
        pendingHours[i].eventName = await getEventNameById(pendingHours[i].eventId);
    }
    res.json({ pending: pendingHours });
  } else {
    res.status(403).json({
      error: "Access Denied",
    })
  }
}
