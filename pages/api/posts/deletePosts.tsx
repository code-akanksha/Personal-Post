import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
     if(req.method === 'DELETE'){
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
          return res.status(401).json({ message: "Please signin to create a post." })
        }
        const postId = req.body
        console.log(postId)
        try {
          const result = await prisma.post.delete({
            where: {
              id: postId,
            },
          })
    
          res.status(200).json(result)
        }catch(err){
            res.status(403).json({err: "Error has occured while making a post"})
        }

    }
}