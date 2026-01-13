import type { Request, Response, NextFunction } from 'express';
import z, { ZodError } from 'zod';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'validation error', details: z.flattenError(err) });
  }

  res.status(500).json({
    message: err instanceof Error ? err.message : 'unexpected error occured'
  });
}
