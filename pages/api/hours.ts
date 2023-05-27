import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb";

export default async function submitHours(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { hours, image, event } = req.body;
    const client = await clientPromise;
    const db = client.db("auth");
    const users = await db.collection("users");
    await users.updateOne({ email: session.user.email }, { $push: { events: { hours: parseInt(hours), picture: image, event: event, approved: null} } });
    res.json({ message: "sussy" })
  } else {
    res.status(403).json({
      error: "You must sign in to be sus.",
    })
  }
}
