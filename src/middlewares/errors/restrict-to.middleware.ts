import type { NextFunction, Request, Response } from 'express';

// admin
// export function restrictToAdmin(req: Request, res: Response, next: NextFunction) {
//   const role = req.user?.role;
//   if (role !== 'admin') {
//     return res
//       .status(403)
//       .json({ message: 'only admin can perform this action' });
//   }
//   next();
// }

export function restrictTo(...canPerformRoles: ('admin' | 'user')[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const userRole = req.user?.role!;
    if (!canPerformRoles.includes(userRole)) {
      return res.status(403).json({ message: 'cannot perform this action' });
    }
    next();
  };
}
