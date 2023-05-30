import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../lib/mongodb";

export default async function isAdmin(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const client = await clientPromise;
    const db = client.db("auth");
    const selUser = await db.collection("users").findOne({ email: session?.user?.email });
    res.json({ admin: selUser?.admin });
  } else {
    res.status(403).json({
      error: "Access Denied",
    })
  }
}
