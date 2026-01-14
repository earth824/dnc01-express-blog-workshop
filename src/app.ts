import 'dotenv/config';
import express from 'express';
import { authRouter } from './routes/auth.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import { blogRouter } from './routes/blog.route.js';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/blogs', blogRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`server running on port: ${port}`);
});
