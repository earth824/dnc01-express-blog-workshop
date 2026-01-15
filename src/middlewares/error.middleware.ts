import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../exceptions/http.exception.js';
import { validationErrorMiddleware } from './errors/validation-error.middleware.js';
import { HttpErrorMiddleware } from './errors/http-error.middleware.js';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: 'token has been expired' });
  }

  res.status(500).json({
    message: err instanceof Error ? err.message : 'unexpected error occured'
  });
}

// const errorRouter = express.Router();
// errorRouter.use(validationErrorMiddleware);
// // errorRouter.use(jwtErrorMiddleware)
// errorRouter.use(HttpErrorMiddleware);
// errorRouter.use(
//   (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
//     console.log('==========================');
//     res.status(500).json({
//       message: err instanceof Error ? err.message : 'unexpected error occured'
//     });
//   }
// );

// export { errorRouter };
