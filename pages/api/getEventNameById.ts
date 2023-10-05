import { NextApiRequest, NextApiResponse } from "next";
import getEventNameById from "@/util/getEventNameById";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get request parameters
    let { eventId } = req.query;

    // Get event name
    let eventName = getEventNameById(eventId as string);

    res.json({ eventName: eventName });
  } catch (e) {
    res.json({ error: e });
  }
}
