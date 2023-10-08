import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function addAdminHours(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { hours, event, email } = req.body;
    const client = await clientPromise;
    const db = client.db("auth");
    const users = await db.collection("users");
    const selUser = await db
      .collection("users")
      .findOne({ email: session?.user?.email });
    if (selUser?.admin === true) {
      await users.updateOne(
        { email: email },
        {
          $push: {
            events: {
              hours: parseFloat(hours),
              picture: "",
              eventId: event,
              approved: true,
              userEmail: email,
              uuid: uuidv4(),
            },
          },
        }
      );
    } else {
      return res.status(403).json({ error: "Not admin!" });
    }
    res.status(200).json({ success: true });
  } else {
    res.status(403).json({
      error: "Not authenicated",
    });
  }
}
