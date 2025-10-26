import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token provided' });

    const token = header.split(' ')[1];
    if (!token) {
    return res.status(401).json({ message: 'No token provided' });
    }
    const payload = verifyToken(token);

  if (!payload) return res.status(401).json({ message: 'Invalid token' });

  (req as any).userId = payload.userId;
  next();
};
