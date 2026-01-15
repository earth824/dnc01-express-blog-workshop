import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.config.js';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    // throw new AuthorizationMissingException()
    return res.status(401).json({ message: 'missing authorization header' });
  }

  const result = authorization.split(' ');
  if (result[0] !== 'Bearer') {
    return res.status(401).json({ message: 'invalid authorization scheme' });
  }

  if (!result[1]) {
    return res.status(401).json({ message: 'JSON web token is missing' });
  }

  const secretKey = env.JWT_SECRET;
  const payload = jwt.verify(result[1], secretKey);
  req.user = {
    id: payload.sub as unknown as number,
    role: (payload as JwtPayload).role
  };
  next();
}
