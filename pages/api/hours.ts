import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import clientPromise from "@/lib/mongodb";
import sumHours from "@/util/sumHours";
import { authOptions } from "./auth/[...nextauth]";

export default async function getHours(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get request parameters
  let { userEmail } = req.body;

  // Get session
  const session = await getServerSession(req, res, authOptions);

  // Deny access if no session is active
  if (!session) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  // Use session email if one isn't passed
  if (userEmail == undefined) {
    userEmail = session.user?.email;
  }

  // Fail if an email still doesn't exist
  if (userEmail == undefined) {
    return res.status(500).json({ error: "No user email provided" });
  }

  try {
    // Get client deatils
    const client = await clientPromise;
    const db = client.db("auth");

    // Get session user
    const selUser = await db.collection("users").findOne({ email: userEmail });

    // Sum the user's approved hours
    let totalHours = sumHours(selUser?.events);

    res.json({ hours: totalHours });
  } catch (e) {
    res.json({ error: e });
  }
}
