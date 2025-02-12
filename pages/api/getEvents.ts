import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { showHidden } = req.query;
    const client = await clientPromise;
    const db = client.db("auth");
    const collection = db.collection("events");
    let allEvents = await collection.find().toArray();

    if (!showHidden)
      allEvents = allEvents.filter(e => !e.hidden);
  
    res.json({ events: allEvents });
  } catch (e) {
    res.json({ error: e });
  }
}
