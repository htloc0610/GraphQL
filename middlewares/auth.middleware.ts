import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, process.env.YOUR_SECRET_KEY);
      (req as any).user = decodedToken;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
