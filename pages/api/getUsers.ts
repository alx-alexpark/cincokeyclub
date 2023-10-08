import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function getUsers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const session = await getServerSession(req, res, authOptions);
        if (session) {
            const client = await clientPromise;
            const db = client.db("auth");
            const selUser = await db
                .collection("users")
                .findOne({ email: session?.user?.email });
            if (selUser?.admin) {
                const collection = db.collection("users");
                let allUsers = await collection.find({}, { projection: { _id: false, name: true, email: true } }).toArray();
                allUsers = allUsers.filter((e) => !e.leaderboardHide);
                res.status(200).json({ users: allUsers });
            } else {
                res.status(403).json({ error: "This action is admin only!" });
            }
        } else {
                res.status(403).json({error: "Auth needed"});
        }
    } catch (e) {
        res.json({ error: e });
    }
}
