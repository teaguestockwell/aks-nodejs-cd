import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

const { secret } = process.env;

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  const tok = req.headers["authorization"];

  if (!tok || typeof tok !== "string") {
    return res.status(401).send({ error: "authorization header required" });
  }

  try {
    (req as any).tok = verify(tok, secret!);
    next();
    return;
  } catch {
    // noop
  }

  return res.status(403).send({ error: "invalid authorization token" });
};

export const issueSig = (meta: any) => {
  return sign(meta, secret!, {
    expiresIn: 60 * 60 * 24 * 7,
  });
};
