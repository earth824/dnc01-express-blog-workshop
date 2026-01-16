import express from 'express';
import { blogController } from '../controllers/blog.controller.js';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware.js';
import { restrictTo } from '../middlewares/errors/restrict-to.middleware.js';

export const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlogById);
blogRouter.post('/', authenticateMiddleware, blogController.createBlog);
blogRouter.patch('/:id', authenticateMiddleware, blogController.updateBlog);
blogRouter.delete('/:id', authenticateMiddleware, blogController.deleteBlog);

// demonstation for restrict role middleware
blogRouter.post(
  '/restrict',
  authenticateMiddleware,
  restrictTo('admin'),
  blogController.restrict
);
