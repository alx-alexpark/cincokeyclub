import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import clientPromise from "@/lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function isAdmin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get session
  const session = await getServerSession(req, res, authOptions);

  // A user without a session cannot be an admin
  if (!session) {
    return res.status(200).json({
      admin: false,
    });
  }

  // Get client deatils
  const client = await clientPromise;
  const db = client.db("auth");

  // Get session user
  const selUser = await db
    .collection("users")
    .findOne({ email: session?.user?.email });

  // Return if the user is an admin
  res.json({ admin: selUser?.admin });
}
