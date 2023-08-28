import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import getEventNameById from "../../util/getEventNameById";

interface Event {
  image: string;
  hours: number;
  event: string;
  approved: null | boolean;
  id: string;
  user: string;
  userImage: string;
}

export default async function yourEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const userEmail = session.user?.email;
      const client = await clientPromise;
      const db = client.db("auth");
      const selUser = await db
        .collection("users")
        .findOne({ email: userEmail });
        let userEvents = selUser?.events;
        for (let i = 0; i < userEvents.length; i++) {
            userEvents[i].eventName = await getEventNameById(userEvents[i].eventId);
        }
      res.json({events: selUser?.events});
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    res.status(403).json({
      error: "Access Denied",
    });
  }
}

