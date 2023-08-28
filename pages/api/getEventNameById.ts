import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";


export default async function getEventNameById(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        let { eventId } = req.query;
        const client = await clientPromise;
        const db = client.db("auth");
        const collection = db.collection("events");
        const allEvents = await collection.find().toArray();
        for (let i = 0; i < allEvents.length; i++) {
            if (allEvents[i].id === eventId) {
                res.json({ eventName: allEvents[i].name });
            }
        }
        res.json({ eventName: "Event not found" });
    } catch (e) {
        res.json({ error: e });
    }
}
