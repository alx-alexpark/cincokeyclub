import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function createEvent(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Get client details
    const client = await clientPromise;
    const db = client.db("auth");

    // Find all non-hidden events
    const collection = db.collection("events");
    let allEvents = await collection.find().toArray();
    allEvents = allEvents.filter((e) => !e.hidden);

    // Return events
    res.json({ events: allEvents });
  } catch (e) {
    res.json({ error: e });
  }
}
