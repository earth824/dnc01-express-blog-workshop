import type { JwtPayload } from 'jsonwebtoken';
import 'express';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: string | JwtPayload;
//     }
//   }
// }

declare module 'express' {
  interface Request {
    user?: { id: number; role: 'admin' | 'user' };
  }
}
