import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function renameUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const { name } = req.body;
  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("auth");
      const usersCollection = db.collection("users");
      usersCollection.updateOne(
        { email: session.user?.email },
        { $set: { name: name } }
      );
      res.status(200).json({ newName: name });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(403).json({
      error: "Access Denied",
    });
  }
}
