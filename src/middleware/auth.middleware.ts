import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user) {
    return next();
  }
  console.error("Not authenticated")
  return res.status(401).json({ error: "Not authenticated" });
}
