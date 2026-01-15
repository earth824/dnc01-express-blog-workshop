import express from 'express';
import { blogController } from '../controllers/blog.controller.js';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';

export const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlogById);
blogRouter.post('/', authenticateMiddleware, blogController.createBlog);
blogRouter.patch('/:id', authenticateMiddleware, blogController.updateBlog);
blogRouter.delete('/:id', authenticateMiddleware, blogController.deleteBlog);
