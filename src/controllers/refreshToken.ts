import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Token } from "../utils/index.js";
import { Session } from "../services/database/index.js";


const privateKey = process.env.JWT_SECRET_KEY;


export async function verifyAndRefreshToken(req: Request, res: Response) {
  const { refresh_token } = req.body;

  jwt.verify(refresh_token, privateKey, async (err: any, user: { id: string }) => {
    if (err) {
      console.log("got an error")
      return res.status(403).json({
        error: "The token has been tampered"
      })
    }

    const session = await Session.getSessionByUserId(parseInt(user.id));
    if (session.expiry <= Math.floor(Date.now() / 1000)) {
      return res.status(403).json({
        error: "Token Expired"
      });
    }

    const accessToken = Token.generateAccessToken(parseInt(user.id), privateKey);

    return res.status(201).json({
      access_token: accessToken,
    });
  })
}
