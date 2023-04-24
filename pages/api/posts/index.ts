import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      //this body comes from schema: Post -> body
      const { body } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      //optional userId, depends if we are on all posts, or user page and looking for his posts
      const { userId } = req.query;

      console.log({ userId });

      let posts;
      //means we are on uses´s page
      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          //only posts from this userId
          where: {
            userId,
          },
          // we want to populate user and comments
          include: {
            user: true,
            comments: true,
          },
          //newest posts
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        //find all posts
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
