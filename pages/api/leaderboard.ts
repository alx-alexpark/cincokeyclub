import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/lib/mongodb";
import LeaderboardEntry from "@/models/LeaderboardEntry";
import sumHours from "@/util/sumHours";

export default async function getLeaderboard(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Get client details
    const client = await clientPromise;
    const db = client.db("auth");

    // Get all users
    const allUsers = await db.collection("users").find().toArray();
    console.log(allUsers);

    // Build a leaderboard from all users
    let leaderboard: LeaderboardEntry[] = [];
    allUsers.forEach((user) => {
      // Skip user if they are hidden from the leaderboard or if they
      // have no events
      if (user.leaderboardHide || !user.events) {
        return;
      }

      // Add user to the leaderboard if they have more than 0 hours
      let userHours = sumHours(user.events);
      if (userHours > 0) {
        leaderboard.push({
          name: user.name,
          hours: userHours,
          picture: user.image,
        });
      }
    });

    // Sort leaderboard from most hours to least hours
    leaderboard.sort((a, b) => b.hours - a.hours);

    // Return the leaderboard
    res.json(leaderboard);
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
}
