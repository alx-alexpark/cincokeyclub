import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const { name } = req.body;
  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("auth");
      const selUser = await db
        .collection("users")
        .findOne({ email: session?.user?.email });
      if (selUser?.admin) {
        await db
          .collection("events")
          .insertOne({
            name: name,
            id: uuidv4(),
            createdBy: session.user?.name,
            dateCreated: Date.now(),
          });
        res.json({ success: true });
      } else {
        res.status(403).json({ error: "This action is admin only!" });
      }
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    res.status(403).json({
      error: "Access Denied",
    });
  }
}
