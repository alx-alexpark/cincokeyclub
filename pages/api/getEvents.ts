import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("auth");
    const collection = db.collection("events");
    const allEvents = await collection.find().toArray();
    res.json({ events: allEvents });
  } catch (e) {
    res.json({ error: e });
  }
}
