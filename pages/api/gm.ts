import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { v4 as uuidv4 } from "uuid";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

interface Event {
  image: string;
  hours: number;
  event: string;
  approved: null | boolean;
  id: string;
  user: string;
  userImage: string;
  code?: number;
  hidden?: boolean;
}

export default async function generalMeeting(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { code } = req.body;
    const client = await clientPromise;
    const db = client.db("auth");
    const users = await db.collection("users");
    const events = await db.collection("events").find().toArray();
    let eventId = "error";
    console.log(code);
    for (const event of events) {
      if (
        event.code ==
        parseInt(code?.toString == undefined ? "-1" : code.toString())
      ) {
        eventId = event.id;
      }
    }
    if (eventId == "error") {
      res.status(500).json({ error: "invalid code" });
      return;
    }

    const you = await db
      .collection("users")
      .findOne({ email: session?.user?.email });
    if (you?.events != undefined) {
      const userEvents = you?.events as Event[];
      if (userEvents.filter((e) => e.id == eventId).length >= 1) {
        res
          .status(420)
          .json({
            error: "You already have gotten the hours for this meeting",
          });
        return;
      }
    }
    await users.updateOne(
      { email: session?.user?.email },
      {
        $push: {
          events: {
            hours: 0.5,
            picture: "",
            eventId: eventId,
            approved: true,
            user: session?.user?.name,
            userImage: session?.user?.image,
            userEmail: session?.user?.email,
            comment: "",
            uuid: uuidv4(),
          },
        },
      }
    );
    res.status(200).json({ message: "Added hours for GM" });
  } else {
    res.status(403).json({
      error: "Not authenicated",
    });
  }
}
