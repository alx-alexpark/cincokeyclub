import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb";

interface Event {
    image: string, hours: number, event: string, approved: null | boolean
}

export default async function isAdmin(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const client = await clientPromise;
    const db = client.db("auth");
    const users = await db.collection("users").find().toArray();
    let pendingHours: Event[]  = [];
    users.forEach((user) => {
        user.events.forEach((event: Event) => {
            if (event.approved === null) {
                pendingHours.push(event);
            }
        });
    });
    res.json({ pending: pendingHours });
  } else {
    res.status(403).json({
      error: "Access Denied",
    })
  }
}
