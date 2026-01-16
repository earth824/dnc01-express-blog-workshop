import type { Request, Response } from 'express';
import z from 'zod';
import { prisma } from '../db/prisma.js';
import type { BlogWhereInput } from '../db/generated/prisma/models.js';

const createPostSchema = z.object({
  content: z.string().min(1),
  status: z.boolean().optional(),
  userId: z.number()
});

function getAllBlogs(req: Request, res: Response) {}

function getBlogById(req: Request, res: Response) {}

async function createBlog(req: Request, res: Response) {
  // validate request body
  const data = createPostSchema.parse({ ...req.body, userId: req.user?.id });
  // insert new blog to databse
  const newBlog = await prisma.blog.create({
    data: {
      content: data.content,
      status: data.status as boolean,
      userId: data.userId
    }
  });
  // sent response: newly created blog
  res.json({ data: newBlog });
}

function updateBlog(req: Request, res: Response) {}

const idSchema = z.object({
  id: z.coerce.number()
});

async function deleteBlog(req: Request, res: Response) {
  const params = idSchema.parse(req.params);

  const blog = await prisma.blog.findUnique({ where: { id: params.id } });
  if (!blog) {
    return res
      .status(404)
      .json({ message: 'blog with provided id was not found' });
  }
  if (blog.userId !== req.user?.id && req.user?.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'you do not have permission to delete this blog' });
  }
  await prisma.blog.update({
    where: {
      id: params.id
    },
    data: {
      deletedAt: new Date()
    }
  });
  res.status(204).json();
  // const where: BlogWhereInput = { id: params.id, deletedAt: null };
  // if (req.user?.role !== 'admin') {
  //   where.userId = req.user?.id as number;
  // }

  // // find blog by id
  // const result = await prisma.blog.updateMany({
  //   data: { deletedAt: new Date() },
  //   where
  // });
  // if (result.count === 0) {
  //   res.status(400).json({message: ''})
  // }
}

export function restrict(req: Request, res: Response) {}

export const blogController = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  restrict
};
