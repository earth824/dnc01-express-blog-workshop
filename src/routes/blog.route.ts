import express from 'express';
import { blogController } from '../controllers/blog.controller.js';

export const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlogById);
blogRouter.post('/', blogController.createBlog);
blogRouter.patch('/:id', blogController.updateBlog);
blogRouter.delete('/:id', blogController.deleteBlog);
