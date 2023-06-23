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

interface LeaderboardEntry {
  name: string;
  hours: number;
  picture: string;
}

export default async function getLeaderboard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let leaderboard: LeaderboardEntry[] = [];
    const client = await clientPromise;
    const db = client.db("auth");
    const allUsers = await db.collection("users").find().toArray();
    allUsers.forEach((user) => {
      let userHours = 0.0;
      user.events.forEach((event: Event) => {
        if (event.approved) {
          userHours += event.hours;
        }
      });
      leaderboard.push({
        name: user.name,
        hours: userHours,
        picture: user.image,
      });
    });
    leaderboard.sort((a, b) => a.hours - b.hours);
    leaderboard.reverse();
    res.json(leaderboard);
  } catch (e) {
    res.json({ error: e });
  }
}