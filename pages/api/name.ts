import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

import clientPromise from "@/lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

interface NameRequest {
  name: string;
}

export default async function renameUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  const { name }: NameRequest = req.body;
  if (session) {
    try {
      const window = new JSDOM("").window;
      const purify = DOMPurify(window);
      const client = await clientPromise;
      const db = client.db("auth");
      const usersCollection = db.collection("users");
      if (name.length == 0 || name.length > 200) {
        res.status(420).json({ error: "What goofy things are you doing?" });
        return;
      }
      usersCollection.updateOne(
        { email: session.user?.email },
        { $set: { name: purify.sanitize(name) } },
      );
      res.status(200).json({ newName: purify.sanitize(name) });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(403).json({
      error: "Access Denied",
    });
  }
}
