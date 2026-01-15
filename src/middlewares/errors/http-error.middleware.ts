import type { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../exceptions/http.exception.js';

export function HttpErrorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpException) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, details: err.details });
  }
  throw err;
}
