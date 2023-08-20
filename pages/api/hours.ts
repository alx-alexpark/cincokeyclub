import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

interface Event {
  image: string;
  hours: number;
  event: string;
  approved: null | boolean;
  id: string;
  user: string;
  userImage: string;
}

export default async function getHours(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
    try {
      let { userEmail } = req.body;

      if (userEmail == undefined && session) {
        userEmail = session.user?.email;
      }

      if (userEmail == undefined) {
        res.status(500).json({ error: "No user email provided" });
      }

      const client = await clientPromise;
      const db = client.db("auth");
      const selUser = await db
        .collection("users")
        .findOne({ email: userEmail });
      let totalHours = 0.0;
      selUser?.events.forEach((event: Event) => {
        if (event.approved) {
          totalHours += event.hours;
        }
      });
      res.json({ hours: totalHours });
    } catch (e) {
      res.json({ error: e });
    }
}
