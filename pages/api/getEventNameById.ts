import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function getEventNameById(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Get request parameters
    let { eventId } = req.query;

    // Get client details
    const client = await clientPromise;
    const db = client.db("auth");

    // Find events
    const collection = db.collection("events");
    const allEvents = await collection.find().toArray();

    // Find and return the first event that matches the event ID
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i].id === eventId) {
        return res.json({ eventName: allEvents[i].name });
      }
    }

    res.json({ eventName: "Event not found" });
  } catch (e) {
    res.json({ error: e });
  }
}
