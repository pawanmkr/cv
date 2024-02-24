import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env')
});

const jwtSecret: string = process.env.JWT_SECRET_KEY || '';
if (!jwtSecret) {
  throw new Error("Unable to retrieve JWT Secret Key from env");
}

export default async function authorization(req: Request, res: Response, next: NextFunction) {
  const authHeader: string = req.headers.authorization || '';
  const token: string = authHeader && authHeader.split(' ')[1] || '';

  if (token) {
    jwt.verify(token, jwtSecret, (err: any, user: any) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ error: 'Failed to authenticate token.' });
      }
      next();
    });
  } else {
    res.status(401).send("Authorization Token is Missing");
  }
}
