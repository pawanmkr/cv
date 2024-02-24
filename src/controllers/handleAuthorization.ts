import dotenv from "dotenv";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { Tokens } from "../types/index.js";
import { Token, hashPassword } from "../utils/index.js";
import { User } from "../services/database/index.js";
import { sendEmailVerificationLink } from "./email.js";


dotenv.config({
  path: path.join(process.cwd(), ".env"),
});


const privateKey: Secret = process.env.JWT_SECRET_KEY;
if (privateKey === undefined) {
  throw new Error("JWT_SECRET NOT FOUND");
}


export class UserController {
  // Registration Controller
  static async registerNewUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, country } = req.body;
    const hashedPassword = hashPassword(password);

    const existingUser: boolean = await User.doesEmailAlreadyExists(email);
    if (existingUser) {
      return res.status(409).send("Email Already Exists! Please Login");
    }

    const registeredUser =
      await User.registerNewUser(name, email, hashedPassword, country);

    const session: Tokens =
      await Token.createNewSession(registeredUser.id, privateKey as string);

    await sendEmailVerificationLink(registeredUser.email);

    return res.status(201).json({
      message: `User Registration Successfull`,
      access_token: session.accessToken,
      refresh_token: session.refreshToken
    });
  }

  // Login Controller
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const existingUser = await User.findExistingEmail(email);
    if (!existingUser) {
      return res.status(404).send("User does not exists! Please Signup");
    }

    const hashedPassword = hashPassword(password);
    if (existingUser.password !== hashedPassword) {
      return res.status(404).send("username or passowrd is incorrect");
    }

    const session: Tokens = await Token.createNewSession(existingUser.id, privateKey as string);

    return res.status(201).json({
      message: `Login Succesfull`,
      access_token: session.accessToken,
      refresh_token: session.refreshToken
    });
  }
}
