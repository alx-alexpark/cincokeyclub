import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb";

interface Event {
    image: string, hours: number, event: string, approved: null | boolean, eventId: string, user: string, userImage: string
}

export default async function approveOrDeny(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const { email, id, status } = req.body;
    if (session) {
        try {
            const client = await clientPromise;
            const db = client.db("auth");
            const user = await db.collection("users").findOne({ email: email });
            user?.events.forEach((event: Event) => {
                if (event.eventId === id) {
                    event.approved = status === "deny" ? false : true;
                    console.log(event.eventId);
                }
            });
            await db.collection("users").updateOne({ email: email }, { $set: { events: user?.events } });
            res.json({ message: "success" });
        } catch (e) {
            res.json({ error: e });
        }
    } else {
        res.status(403).json({
            error: "Access Denied",
        })
    }
}
