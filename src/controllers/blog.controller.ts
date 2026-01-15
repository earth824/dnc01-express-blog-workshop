import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import z from 'zod';
import { prisma } from '../db/prisma.js';

const createPostSchema = z.object({
  content: z.string().min(1),
  status: z.boolean().optional()
});

function getAllBlogs(req: Request, res: Response) {}

function getBlogById(req: Request, res: Response) {}

async function createBlog(req: Request, res: Response) {
  // verify JWT
  console.log(req.headers.authorization); // Bearer JWT
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: 'missing authorization header' });
  }

  const result = authorization.split(' ');
  if (result[0] !== 'Bearer') {
    return res.status(401).json({ message: 'invalid authorization scheme' });
  }

  if (!result[1]) {
    return res.status(401).json({ message: 'JSON web token is missing' });
  }
  const secretKey = process.env.JWT_SECRET ?? 'aaaaaaaaaaaaaaaa';
  const payload = jwt.verify(result[1], secretKey);

  // validate request body
  const data = createPostSchema.parse(req.body);
  // insert new blog to databse
  const newBlog = await prisma.blog.create({
    data: {
      content: data.content,
      status: data.status as boolean,
      userId: payload.sub as unknown as number
    }
  });
  // sent response: newly created blog
  res.json({ data: newBlog });
}

function updateBlog(req: Request, res: Response) {}

function deleteBlog(req: Request, res: Response) {}

export const blogController = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
