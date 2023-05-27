import { getServerSession } from "next-auth/next"
import authOptions from "./auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"

export default async function listMovies(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    res.json({message: "sussy"})
  } else {
    res.send({
      error: "You must sign in to be sus.",
    })
  }
}
