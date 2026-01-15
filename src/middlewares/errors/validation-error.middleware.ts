import type { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { ValidationException } from '../../exceptions/validation.exception.js';

export function validationErrorMiddleware(
  err: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    throw new ValidationException(z.flattenError(err));
    // return res
    //   .status(400)
    //   .json({ message: 'validation error', details: z.flattenError(err) });
  }
  next(err);
}
