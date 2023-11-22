import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { showHidden } = req.query;
    const client = await clientPromise;
    const db = client.db("auth");

    // Find all non-hidden events
    const collection = db.collection("events");
    let allEvents = await collection.find().toArray();

    if (!showHidden) allEvents = allEvents.filter((e) => !e.hidden);

    res.json({ events: allEvents });
  } catch (e) {
    res.json({ error: e });
  }
}
