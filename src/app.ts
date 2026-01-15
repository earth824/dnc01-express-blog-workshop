import express from 'express';
import { authRouter } from './routes/auth.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import { blogRouter } from './routes/blog.route.js';
import { validationErrorMiddleware } from './middlewares/errors/validation-error.middleware.js';
import { HttpErrorMiddleware } from './middlewares/errors/http-error.middleware.js';
import { env } from './config/env.config.js';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/blogs', blogRouter);

app.use(notFoundMiddleware);

app.use(validationErrorMiddleware);
app.use(HttpErrorMiddleware);
app.use(errorMiddleware);

const port = env.PORT;
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`server running on port: ${port}`);
});

// interface A {
//   name: string;
// }

// interface A {
//   age: number;
// }

// const z: A = { age: 8, name: 'ron' };
// INTERFACE DECLARATION MERGING
// interface A {
//   name: string;
//   age: number
// }
