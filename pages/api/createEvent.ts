import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { v4 as uuidv4 } from "uuid";

import { authOptions } from "./auth/[...nextauth]";
import clientPromise from "@/lib/mongodb";

export default async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get request parameters
  const { name } = req.query;

  // Get session
  const session = await getServerSession(req, res, authOptions);

  // Deny access if no session is active
  if (!session) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  try {
    // Get client details
    const client = await clientPromise;
    const db = client.db("auth");
    const selUser = await db
      .collection("users")
      .findOne({ email: session?.user?.email });

    // Cancel request if the user is not an admin
    if (!selUser?.admin) {
      return res.status(403).json({ error: "This action is admin only!" });
    }

    // Add event to the database
    await db.collection("events").insertOne({
      name: name,
      id: uuidv4(),
      createdBy: session.user?.name,
      dateCreated: Date.now(),
    });

    res.json({ success: true });
  } catch (e) {
    res.json({ error: e });
  }
}
