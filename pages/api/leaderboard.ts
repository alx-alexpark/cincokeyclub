import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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
    console.log(allUsers);
    allUsers.forEach((user) => {
      let userHours = 0.0;
      if (user.leaderboardHide != true) {
        if (user.events != undefined) {
          user.events.forEach((event: Event) => {
            if (event.approved) {
              userHours += event.hours;
            }
          });
        }
        if (userHours > 0) {
          leaderboard.push({
            name: user.name,
            hours: userHours,
            picture: user.image,
          });
        }
        
      }
    });
    leaderboard.sort((a, b) => a.hours - b.hours);
    leaderboard.reverse();
    res.json(leaderboard);
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
}
