import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

const secret = (() => {
  const res = process.env.jwt
  if (!res) {
    // eslint-disable-next-line no-console
    console.warn('"secret" found in env, using the default value: "secret"')
    return 'secret'
  }
  return res
})()

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  const tok = req.headers["authorization"];

  if (!tok || typeof tok !== "string") {
    return res.status(401).json({ error: "authorization header required" });
  }

  try {
    (req as any).tok = verify(tok, secret);
    next();
    return;
  } catch {
    // 
  }

  return res.status(403).json({ error: "invalid authorization token" });
};

export const issueSig = (meta: any) => {
  return sign(meta, secret, {
    expiresIn: 60 * 60 * 24 * 7,
  });
};
