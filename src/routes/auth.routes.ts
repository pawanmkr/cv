import { Router } from "express";
import { InputValidation } from "../utils/index.js";
import {
  UserController,
  generatePasswordResetToken,
  verifyAndRefreshToken,
  confirmPasswordReset,
  sendEmailVerificationLink,
  confirmEmailVerification
} from "../controllers/index.js";


const authRouter = Router();


authRouter.post("/register", InputValidation.validateUserRegistration, UserController.registerNewUser);
authRouter.post("/login", InputValidation.validateUserLogin, UserController.login);

authRouter.post("/token/refresh", verifyAndRefreshToken);

authRouter.post("/password/reset/request", InputValidation.validateEmail, generatePasswordResetToken);
authRouter.post("/password/reset/confirm", InputValidation.validatePassword, confirmPasswordReset);

authRouter.post("/email/verify/request", InputValidation.validateEmail, sendEmailVerificationLink);
authRouter.get("/email/verify/confirm", confirmEmailVerification);

export default authRouter;